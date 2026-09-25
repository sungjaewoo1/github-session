# Git 과제 — 두 상황별 최신 변경 반영 및 main 배포

## 공통 가정

- 나는 팀장이며, 두 상황 모두 본인의 로컬 작업 브랜치 `feature/my-work`에 있다.
- 원격 저장소는 `origin`, 기본 브랜치는 `develop`이다.
- 팀원이 원격 `develop`에 PR을 머지했다.
- 팀원은 `develop`에만 머지할 수 있고, `main`에는 팀장만 머지할 수 있다.
- `main`에 머지하면 자동 배포가 실행된다.
- 로컬에 `develop`, `main`, 작업 브랜치가 있고, 로컬 develop과 main에 별도의 미푸시 커밋은 없다고 가정한다.

명령은 해당 Git 저장소에서 실행한다. `feature/my-work`와 예시 파일 경로는 본인의 실제 값으로 바꾼다. 아래 내용은 가상 상황에 대한 답안이며 실제 실행 또는 배포 결과를 뜻하지 않는다.

## 1번 상황: 코드를 작성하지 않은 상태

내 로컬 작업 브랜치에서 코드를 작성하지 않아 작업 트리가 깨끗하다. stash 없이 develop을 최신화하고 내 브랜치에 반영할 수 있다.

### 1. 전체 흐름도

```text
내 로컬 작업 브랜치에 있음 — 코드 작성 전
    ↓
팀원이 원격 develop에 PR 머지
    ↓
git status로 변경 사항이 없는지 확인
    ↓
로컬 develop으로 이동 → 원격 develop으로 최신화
    ↓
내 작업 브랜치로 복귀 → develop 병합
    ↓
충돌이 있으면 해결하고 병합 커밋 완료
    ↓
내 코드 작성 → 테스트 → add → commit → push
    ↓
내 작업 브랜치 → develop PR 생성
    ↓
리뷰·CI 확인 → develop에 머지
    ↓
develop → main 배포 PR 생성
    ↓
전체 배포 범위·리뷰·CI 확인 → 팀장이 main에 머지
    ↓
자동 배포 실행 → 배포 결과 및 서비스 동작 확인
    ↓
로컬 develop·main 최신화 → 작업 브랜치로 복귀
```

새로 작성할 내 작업 없이 팀원의 변경만 배포한다면, 내 코드 작성부터 작업 브랜치 → develop PR까지는 생략한다. 최신 develop을 검증하고 develop → main 배포 PR을 진행하면 된다.

### 2. 실제 명령어 순서

**① 현재 상태 확인 및 로컬 develop 최신화**

```bash
git branch --show-current
git status
git switch develop
git pull --ff-only origin develop
```

현재 위치가 본인의 작업 브랜치이고 작업 트리가 깨끗한지 확인한다. `--ff-only`는 로컬 develop에 불필요한 병합 커밋을 만들지 않고 최신화한다. 분기된 이력 때문에 실패하면 원인을 확인한 뒤 진행한다.

**② 내 작업 브랜치에 최신 develop 반영**

```bash
git switch feature/my-work
git merge develop
```

충돌이 없으면 다음 단계로 진행한다. 충돌이 발생했다면 파일을 편집하여 충돌 표시를 제거하고, 해결한 모든 파일을 스테이징한 후 병합을 완료한다.

```bash
# 충돌이 발생했을 때만 실행한다.
git status
# 파일을 편집한 후 실제 해결한 파일 경로를 지정한다.
git add path/to/resolved-file
git commit -m "merge: develop 변경 반영 및 충돌 해결"
```

**③ 내 작업 작성, 테스트 및 업로드**

최신 코드 위에서 작업하고 프로젝트의 테스트·빌드를 실행한다. 아래 파일 경로는 실제 변경한 경로로 바꾸며, 필요한 파일을 모두 지정한다.

```bash
git diff
git add path/to/my-file
git diff --staged
git commit -m "feat: 작업 내용 구현"
git push -u origin feature/my-work
```

**④ GitHub에서 PR 생성 및 배포**

1. base를 `develop`, compare를 `feature/my-work`로 지정해 PR을 생성한다.
2. 리뷰와 CI 통과를 확인하고 develop에 머지한다.
3. base를 `main`, compare를 `develop`으로 지정해 배포 PR을 생성한다. 기본 대상 브랜치가 develop이므로 main으로 바꾸었는지 확인한다.
4. 내 변경뿐 아니라 develop에서 main으로 들어갈 전체 변경이 배포 가능한지 확인한다.
5. 리뷰·CI 결과를 확인하고 팀장 권한으로 main에 머지한다.
6. 자동 배포 파이프라인의 성공 여부와 실제 서비스의 주요 기능을 확인한다. PR 머지 성공만으로 배포 성공이라고 판단하지 않는다.

**⑤ 배포 후 로컬 최신화**

작업 트리가 깨끗한 상태에서 다음을 실행한다.

```bash
git switch develop
git pull --ff-only origin develop
git switch main
git pull --ff-only origin main
git switch feature/my-work
```

## 2번 상황: 코드를 작성했지만 아직 커밋하지 않은 상태

내 작업 브랜치에 미커밋 변경 사항이 있으므로 stash에 임시 보관한다. develop을 최신화하고 내 작업 브랜치에 병합한 다음 stash pop으로 복원한다. 복원한 코드와 최신 코드가 함께 동작하는지 확인한 후 커밋한다.

### 1. 전체 흐름도

```text
내 로컬 작업 브랜치에 있음 — 코드 작성 후, 커밋 전
    ↓
팀원이 원격 develop에 PR 머지
    ↓
git status로 미커밋 변경 사항 확인
    ↓
[stash] git stash push -u로 내 작업 임시 보관
    ↓
로컬 develop으로 이동 → 원격 develop으로 최신화
    ↓
내 작업 브랜치로 복귀 → develop 병합
    ↓
병합 충돌이 있으면 해결하고 병합 커밋 완료
    ↓
[stash pop] 최신 develop이 반영된 내 브랜치에 작업 복원
    ↓
복원 충돌이 있으면 해결 → 코드 확인 및 테스트
    ↓
add → commit → 충돌로 남은 해당 stash 정리 → push
    ↓
내 작업 브랜치 → develop PR 생성
    ↓
리뷰·CI 확인 → develop에 머지
    ↓
develop → main 배포 PR 생성
    ↓
전체 배포 범위·리뷰·CI 확인 → 팀장이 main에 머지
    ↓
자동 배포 실행 → 배포 결과 및 서비스 동작 확인
    ↓
로컬 develop·main 최신화 → 작업 브랜치로 복귀
```

### 2. 실제 명령어 순서

**① 작업 브랜치에서 미커밋 변경 사항 보관**

```bash
git branch --show-current
git status
git stash push -u -m "WIP: develop 반영 전 작업 보관"
git stash list
git status
```

`-u`는 새로 생성한 미추적 파일까지 보관한다. .gitignore로 무시되는 파일은 포함되지 않는다. stash 후 작업 변경 사항이 남아 있지 않은지 확인한다. 아래 절차 중 다른 stash를 추가하지 않는다고 가정한다.

**② develop 최신화 후 내 브랜치에 병합**

```bash
git switch develop
git pull --ff-only origin develop
git switch feature/my-work
git merge develop
```

병합 충돌이 발생하면 먼저 해결하여 병합을 완료한다. 병합 완료 전에는 stash pop을 실행하지 않는다.

```bash
# 병합 충돌이 있을 때만 실행한다.
git status
# 충돌 파일을 수정하고 실제 해결한 파일을 모두 지정한다.
git add path/to/resolved-file
git commit -m "merge: develop 변경 반영 및 충돌 해결"
```

**③ stash pop으로 내 작업 복원**

```bash
git stash pop
git status
git diff
```

반드시 내 작업 브랜치에서 develop 병합을 마친 뒤 복원한다.

- 충돌 없이 복원되면 해당 stash는 자동 삭제된다.
- 복원 과정에서 충돌이 발생하면 stash는 남아 있다. 파일을 직접 수정해 최신 코드와 내 작업을 함께 반영하고 충돌 표시를 제거한다.
- stash pop 충돌에서는 `git merge --continue`를 실행하지 않는다. 해결한 파일을 add하고 내 작업 커밋을 만든다.
- 기본 pop은 이전 스테이징 상태까지 복구하지 않으므로, 커밋할 파일을 다시 확인하고 스테이징한다.

**④ 테스트 및 커밋**

프로젝트의 테스트·빌드를 실행하여 복원한 코드가 정상 동작하는지 확인한다. 아래 파일 경로는 실제 작업 파일로 바꾸고, 충돌을 해결한 파일도 모두 포함한다.

```bash
git diff
git add path/to/my-file
git diff --staged
git commit -m "feat: 최신 develop 기반으로 작업 반영"
git status
git stash list
```

pop 충돌로 해당 stash가 남았다면, 작업이 커밋에 온전히 반영되었는지 확인한 뒤 그 stash만 삭제한다. 아래 명령은 해당 보관본이 여전히 `stash@{0}`인 경우다. PowerShell에서도 해석되도록 따옴표를 사용한다.

```bash
# pop 충돌로 남은 해당 stash가 있을 때만 실행한다.
git stash show -p -u 'stash@{0}'
git stash drop 'stash@{0}'
```

pop이 성공했다면 위 삭제 명령을 실행하지 않는다. 다른 보관본을 삭제하지 않도록 stash 목록과 메시지를 확인한다.

```bash
git push -u origin feature/my-work
```

**⑤ GitHub에서 PR 생성 및 배포**

1. base: `develop` / compare: `feature/my-work`로 PR을 생성한다.
2. 팀원의 변경과 복원한 내 작업이 함께 정상 동작하는지 리뷰·CI로 확인하고 develop에 머지한다.
3. base: `main` / compare: `develop`으로 배포 PR을 생성한다.
4. 배포 대상 전체 변경과 리뷰·CI 결과를 확인한다.
5. 팀장 권한으로 main에 머지하여 자동 배포를 실행한다.
6. 배포 파이프라인 성공과 실제 서비스 동작을 확인한다.

두 상황 모두 PR 대기 중 develop이 다시 갱신되어 충돌이 발생하면, 작업 트리가 깨끗한 상태에서 develop 최신화와 작업 브랜치 병합을 다시 수행한다. 해결한 커밋을 작업 브랜치에 push하고 리뷰·CI를 다시 확인한다.

**⑥ 배포 후 로컬 최신화**

```bash
git switch develop
git pull --ff-only origin develop
git switch main
git pull --ff-only origin main
git switch feature/my-work
```

## 두 상황의 차이

| 구분 | 1번: 코드 작성 전 | 2번: 코드 작성 후, 커밋 전 |
| --- | --- | --- |
| 시작 위치 | 본인의 로컬 작업 브랜치 | 본인의 로컬 작업 브랜치 |
| 미커밋 변경 사항 | 없음 | 있음 |
| develop 이동 전 | 상태 확인 후 이동 | stash로 내 작업 보관 후 이동 |
| develop 병합 후 | 새 작업 진행 또는 팀원 변경 배포 | stash pop으로 기존 작업 복원 |
| 충돌 확인 시점 | develop 병합 시 | develop 병합 시 및 stash pop 시 |
| 배포 | 팀장이 develop → main PR 머지 후 자동 배포 확인 | 동일 |

## 제출 안내

위 1번·2번 답안을 노션 과제 제출 페이지 중 본인 이름의 페이지에 작성한다. 브랜치 이름과 작업 내용은 실제 본인 환경에 맞게 바꾼다.

스크린샷의 실제 팀장 전용 별도 과제는 팀 Organization과 BE·FE Repository를 설정하고 GitHub 주소를 노션에 첨부하는 것이다. 과제 확인 기간에는 해당 저장소를 public으로 설정한다. 여기서는 답안 문서만 작성했으며, 저장소 설정이나 노션 제출을 수행한 것은 아니다.
