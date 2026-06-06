$files = Get-ChildItem -Path 'c:\Users\Rabiul\Desktop\humayan-rashid-portfolio\src\components\dashboard' -Filter *.tsx -Recurse
foreach ($f in $files) {
    $c = Get-Content $f.FullName -Raw
    $c = $c -replace 'dark:text-zinc-550', 'text-[#cbf341]'
    $c = $c -replace 'text-zinc-550', 'text-[#cbf341]'
    $c = $c -replace 'text-zinc-650', 'text-[#cbf341]'
    $c = $c -replace 'text-zinc-850', 'text-[#cbf341]'
    $c = $c -replace 'border-zinc-550', 'border-[#cbf341]'
    $c = $c -replace 'border-zinc-650', 'border-[#cbf341]'
    $c = $c -replace 'bg-zinc-950', 'bg-[#0b2e24]'
    $c = $c -replace 'bg-zinc-900', 'bg-[#0b2e24]'
    $c = $c -replace 'hover:bg-zinc-50', 'hover:bg-[#0b2e24]/10'
    $c = $c -replace 'hover:bg-zinc-150/70', 'hover:bg-[#0b2e24]/10'
    $c = $c -replace 'bg-zinc-100/70', 'bg-[#0a2219]/70'
    Set-Content -Path $f.FullName -Value $c -NoNewline
    Write-Output "Post‑processed $($f.Name)"
}
