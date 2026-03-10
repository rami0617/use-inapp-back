# GitHub Actions NPM Publish Setup Guide

## 1. NPM Access Token 생성

### 1.1 NPM 로그인
https://www.npmjs.com 에서 로그인

### 1.2 Access Token 생성
1. 우측 상단 프로필 클릭 → **Access Tokens** 선택
2. **Generate New Token** → **Classic Token** 선택
3. Token 설정:
   - **Token name**: `github-actions-use-inapp-back` (원하는 이름)
   - **Token type**: **Automation** 선택 (권장)
     - 또는 **Publish** (자동화 전용)
4. **Generate Token** 클릭
5. 🔴 **생성된 토큰을 복사** (다시 볼 수 없습니다!)

## 2. GitHub Secrets에 토큰 추가

### 2.1 GitHub Repository 설정으로 이동
https://github.com/rami0617/use-inapp-back/settings/secrets/actions

### 2.2 New repository secret 추가
1. **New repository secret** 버튼 클릭
2. **Name**: `NPM_TOKEN` (정확히 이 이름으로!)
3. **Secret**: 복사한 NPM 토큰 붙여넣기
4. **Add secret** 클릭

## 3. 작동 방식

### 자동 배포 트리거
main 브랜치에 푸시하면 자동으로:

1. ✅ 코드 체크아웃
2. ✅ Node.js 20 설치
3. ✅ 의존성 설치 (`npm ci`)
4. ✅ 타입 체크 (`npm run type-check`)
5. ✅ 테스트 실행 (`npm test`)
6. ✅ 빌드 (`npm run build`)
7. ✅ NPM 버전 중복 확인
8. ✅ NPM 배포 (`npm publish`) - 버전이 없을 때만
9. ✅ Git 태그 생성 (예: `v0.1.0`)

### 중복 배포 방지
- 이미 NPM에 같은 버전이 존재하면 배포를 **건너뜁니다**
- 새로운 버전을 배포하려면 `package.json`의 `version`을 올려야 합니다

## 4. 배포 워크플로우

### 방법 1: develop → main PR 머지
```bash
# 1. develop 브랜치에서 작업
git checkout develop
# ... 코드 수정 ...

# 2. package.json 버전 업데이트
npm version patch   # 0.1.0 → 0.1.1 (버그 수정)
# 또는
npm version minor   # 0.1.0 → 0.2.0 (새 기능)
# 또는
npm version major   # 0.1.0 → 1.0.0 (Breaking changes)

# 3. 변경사항 커밋 & 푸시
git add .
git commit -m "chore: bump version to 0.1.1"
git push origin develop

# 4. GitHub에서 develop → main PR 생성 & 머지
# → 자동으로 NPM 배포 실행!
```

### 방법 2: main 브랜치에 직접 푸시
```bash
# 1. main 브랜치로 이동
git checkout main

# 2. 버전 업데이트
npm version patch

# 3. 푸시
git push origin main
# → 자동으로 NPM 배포 실행!
```

## 5. 배포 확인

### GitHub Actions 확인
https://github.com/rami0617/use-inapp-back/actions

### NPM 패키지 확인
https://www.npmjs.com/package/use-inapp-back

### Git 태그 확인
```bash
git tag
# 또는
git ls-remote --tags origin
```

## 6. 트러블슈팅

### 에러: "npm ERR! code ENEEDAUTH"
→ NPM_TOKEN이 GitHub Secrets에 제대로 설정되지 않았습니다.
→ Secret 이름이 정확히 `NPM_TOKEN`인지 확인하세요.

### 에러: "npm ERR! 403 Forbidden"
→ NPM 토큰 권한이 부족합니다.
→ **Automation** 또는 **Publish** 타입의 토큰인지 확인하세요.

### 배포가 건너뛰어짐
→ 이미 같은 버전이 NPM에 존재합니다.
→ `package.json`의 `version`을 업데이트하세요.

### 테스트 실패
→ GitHub Actions에서 테스트가 실패하면 배포되지 않습니다.
→ 로컬에서 `npm test`를 실행해서 모든 테스트가 통과하는지 확인하세요.

## 7. 수동 배포 (비상시)

GitHub Actions가 실패하거나 긴급 배포가 필요한 경우:

```bash
# 로컬에서 수동 배포
npm login
npm publish --access public
```

## 8. 보안 주의사항

- ⚠️ NPM_TOKEN은 **절대 코드에 포함하지 마세요**
- ⚠️ NPM_TOKEN은 GitHub Secrets에만 저장하세요
- ⚠️ 토큰이 노출되면 즉시 NPM에서 삭제하고 새로 생성하세요
- ✅ Automation 타입 토큰 사용 권장 (최소 권한 원칙)

## 9. 추가 정보

### Semantic Versioning
- **Patch** (0.1.0 → 0.1.1): 버그 수정
- **Minor** (0.1.0 → 0.2.0): 새로운 기능 추가 (하위 호환)
- **Major** (0.1.0 → 1.0.0): Breaking changes

### GitHub Actions 로그 보기
1. https://github.com/rami0617/use-inapp-back/actions
2. 최근 워크플로우 실행 클릭
3. "publish" 잡 클릭
4. 각 스텝의 로그 확인

### 배포 취소 (NPM Unpublish)
```bash
# 24시간 이내에만 가능
npm unpublish use-inapp-back@0.1.0

# 또는 전체 패키지 삭제 (주의!)
npm unpublish use-inapp-back --force
```

⚠️ NPM unpublish는 신중하게 사용하세요. 이미 사용 중인 사용자에게 영향을 줄 수 있습니다.
