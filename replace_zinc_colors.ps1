$files = Get-ChildItem -Path 'c:\Users\Rabiul\Desktop\humayan-rashid-portfolio\src\components\dashboard' -Filter *.tsx -Recurse
foreach ($f in $files) {
    $c = Get-Content $f.FullName -Raw
    $c = $c -replace 'bg-zinc-900', 'bg-[#0b2e24]'
    $c = $c -replace 'bg-zinc-800', 'bg-[#0a2219]'
    $c = $c -replace 'bg-zinc-100', 'bg-[#072418]'
    $c = $c -replace 'bg-zinc-100/80', 'bg-[#0a2219]/80'
    $c = $c -replace 'text-zinc-900', 'text-[#061910]'
    $c = $c -replace 'text-zinc-50', 'text-[#061910]'
    $c = $c -replace 'text-zinc-500', 'text-[#cbf341]'
    $c = $c -replace 'text-zinc-400', 'text-[#cbf341]'
    $c = $c -replace 'text-zinc-450', 'text-[#cbf341]'
    $c = $c -replace 'border-zinc-200', 'border-[#061910]'
    $c = $c -replace 'border-zinc-100', 'border-[#061910]'
    $c = $c -replace 'border-zinc-150', 'border-[#061910]/50'
    $c = $c -replace 'placeholder-zinc-400', 'placeholder-[#cbf341]'
    $c = $c -replace 'placeholder-zinc-500', 'placeholder-[#cbf341]'
    $c = $c -replace 'bg-zinc-50/50', 'bg-[#0b2e24]/10'
    $c = $c -replace 'bg-zinc-100/70', 'bg-[#0a2219]/70'
    $c = $c -replace 'divide-zinc-100', 'divide-[#061910]'
    $c = $c -replace 'divide-zinc-150', 'divide-[#061910]/50'
    $c = $c -replace 'shadow-zinc-500/15', 'shadow-[#cbf341]/15'
    Set-Content -Path $f.FullName -Value $c -NoNewline
    Write-Output "Processed $($f.Name)"
}
