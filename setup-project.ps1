# HE CARES FOUNDATION - Project Structure (No Components)
Write-Host "Creating HE CARES Foundation project structure..." -ForegroundColor Green

# ================================
# BACKEND STRUCTURE (FastAPI)
# ================================

# Backend directories
New-Item -ItemType Directory -Path "backend\app\routers" -Force
New-Item -ItemType Directory -Path "backend\app\models" -Force
New-Item -ItemType Directory -Path "backend\app\schemas" -Force
New-Item -ItemType Directory -Path "backend\app\crud" -Force
New-Item -ItemType Directory -Path "backend\app\core" -Force
New-Item -ItemType Directory -Path "backend\app\services" -Force
New-Item -ItemType Directory -Path "backend\app\utils" -Force
New-Item -ItemType Directory -Path "backend\app\static\uploads" -Force
New-Item -ItemType Directory -Path "backend\tests" -Force

# Backend main files
New-Item -ItemType File -Path "backend\app\main.py"
New-Item -ItemType File -Path "backend\app\__init__.py"
New-Item -ItemType File -Path "backend\app\database.py"

# Router files
New-Item -ItemType File -Path "backend\app\routers\__init__.py"
New-Item -ItemType File -Path "backend\app\routers\auth.py"
New-Item -ItemType File -Path "backend\app\routers\donations.py"
New-Item -ItemType File -Path "backend\app\routers\volunteers.py"
New-Item -ItemType File -Path "backend\app\routers\contact.py"

# Model files
New-Item -ItemType File -Path "backend\app\models\__init__.py"
New-Item -ItemType File -Path "backend\app\models\user.py"
New-Item -ItemType File -Path "backend\app\models\donation.py"
New-Item -ItemType File -Path "backend\app\models\volunteer.py"

# Schema files
New-Item -ItemType File -Path "backend\app\schemas\__init__.py"
New-Item -ItemType File -Path "backend\app\schemas\user.py"
New-Item -ItemType File -Path "backend\app\schemas\donation.py"
New-Item -ItemType File -Path "backend\app\schemas\auth.py"

# CRUD files
New-Item -ItemType File -Path "backend\app\crud\__init__.py"
New-Item -ItemType File -Path "backend\app\crud\base.py"

# Core files
New-Item -ItemType File -Path "backend\app\core\__init__.py"
New-Item -ItemType File -Path "backend\app\core\config.py"
New-Item -ItemType File -Path "backend\app\core\security.py"
New-Item -ItemType File -Path "backend\app\core\database.py"

# Service files
New-Item -ItemType File -Path "backend\app\services\__init__.py"
New-Item -ItemType File -Path "backend\app\services\email_service.py"
New-Item -ItemType File -Path "backend\app\services\supabase_service.py"

# Utility files
New-Item -ItemType File -Path "backend\app\utils\__init__.py"
New-Item -ItemType File -Path "backend\app\utils\helpers.py"

# Backend config files
New-Item -ItemType File -Path "backend\requirements.txt"
New-Item -ItemType File -Path "backend\.env.example"
New-Item -ItemType File -Path "backend\.gitignore"

# ================================
# FRONTEND STRUCTURE (Folders Only)
# ================================

# Core service directories
New-Item -ItemType Directory -Path "frontend\src\app\core\services" -Force
New-Item -ItemType Directory -Path "frontend\src\app\core\models" -Force
New-Item -ItemType Directory -Path "frontend\src\app\core\guards" -Force
New-Item -ItemType Directory -Path "frontend\src\app\core\interceptors" -Force

# Component directories (empty - you'll create components as needed)
New-Item -ItemType Directory -Path "frontend\src\app\pages" -Force
New-Item -ItemType Directory -Path "frontend\src\app\shared\components" -Force

# Assets
New-Item -ItemType Directory -Path "frontend\src\assets\images" -Force
New-Item -ItemType Directory -Path "frontend\src\assets\styles" -Force

# Core services only
New-Item -ItemType File -Path "frontend\src\app\core\services\auth.service.ts"
New-Item -ItemType File -Path "frontend\src\app\core\services\api.service.ts"
New-Item -ItemType File -Path "frontend\src\app\core\services\supabase.service.ts"

# Core models only
New-Item -ItemType File -Path "frontend\src\app\core\models\user.model.ts"
New-Item -ItemType File -Path "frontend\src\app\core\models\api-response.model.ts"

# Guards
New-Item -ItemType File -Path "frontend\src\app\core\guards\auth.guard.ts"

# Custom SCSS files
New-Item -ItemType File -Path "frontend\src\assets\styles\_variables.scss"
New-Item -ItemType File -Path "frontend\src\assets\styles\_globals.scss"

# ================================
# DATABASE
# ================================

New-Item -ItemType Directory -Path "database" -Force
New-Item -ItemType File -Path "database\schema.sql"

# ================================
# ROOT FILES
# ================================

New-Item -ItemType File -Path ".env.example"
New-Item -ItemType File -Path ".gitignore"
New-Item -ItemType File -Path "README.md"

Write-Host "Project structure created!" -ForegroundColor Green
Write-Host "Ready for: ng new frontend --standalone --routing --style=scss" -ForegroundColor Cyan
Write-Host "Components will be created as needed with ng generate" -ForegroundColor Yellow