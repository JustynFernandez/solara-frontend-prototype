param(
  [Parameter(Mandatory = $true)]
  [string]$PptxPath,
  [Parameter(Mandatory = $true)]
  [string]$OutDir
)

$resolvedPptx = (Resolve-Path $PptxPath).Path
if (-not (Test-Path $resolvedPptx)) {
  throw "PPTX not found: $PptxPath"
}

if (-not (Test-Path $OutDir)) {
  New-Item -ItemType Directory -Path $OutDir | Out-Null
}

$resolvedOut = (Resolve-Path $OutDir).Path

$ppt = $null
$presentation = $null

try {
  $ppt = New-Object -ComObject PowerPoint.Application
  $ppt.Visible = -1
  $presentation = $ppt.Presentations.Open($resolvedPptx, $false, $false, $false)
  $presentation.Export($resolvedOut, "PNG")
  $presentation.Close()
  $ppt.Quit()
  Write-Output "EXPORTED=$resolvedOut"
}
finally {
  if ($presentation -ne $null) { try { $presentation.Close() } catch {} }
  if ($ppt -ne $null) { try { $ppt.Quit() } catch {} }
}
