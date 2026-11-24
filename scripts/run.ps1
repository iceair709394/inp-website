#requires -Version 5.1
[CmdletBinding()]
param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]] $CommandArgs
)

# 固定项目运行时到 Node 24.22.1。
# 只影响当前进程的 PATH，不写系统/用户环境变量。

$ErrorActionPreference = 'Stop'

$NodeRoot = 'F:\nodejs'
$nodeExe = Join-Path $NodeRoot 'node.exe'
$npmCmd = Join-Path $NodeRoot 'npm.cmd'

if (-not (Test-Path -LiteralPath $nodeExe)) {
    throw ('找不到 Node 运行时: ' + $nodeExe + ' —— 请确认 Node 24 装在 F:\nodejs，或修改本脚本的 $NodeRoot')
}
if (-not (Test-Path -LiteralPath $npmCmd)) {
    throw ('找不到 npm: ' + $npmCmd)
}

$env:Path = $NodeRoot + ';' + $env:Path

$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $ProjectRoot

if ($CommandArgs.Count -eq 0) {
    & $nodeExe -v
    & $npmCmd -v
    exit $LASTEXITCODE
}

& $npmCmd @CommandArgs
exit $LASTEXITCODE
