# Fix BookingModal.tsx first (specifically line 146 and any remaining cyan elements)
$f = 'c:\Users\Rabiul\Desktop\humayan-rashid-portfolio\src\components\BookingModal.tsx'
$c = Get-Content $f -Raw
$c = $c -replace 'bg-zinc-100 border-zinc-400 dark:bg-cyan-500/10 dark:border-cyan-500/30 text-zinc-900 dark:text-\[#cbf341\]', 'bg-[#cbf341]/10 border-[#cbf341]/30 text-[#cbf341]'
Set-Content $f $c -NoNewline
Write-Output 'Done fixing BookingModal.tsx leftover'

# Let us list the dashboard files to process
$dashboardFiles = @(
    'c:\Users\Rabiul\Desktop\humayan-rashid-portfolio\src\components\dashboard\Users.tsx',
    'c:\Users\Rabiul\Desktop\humayan-rashid-portfolio\src\components\dashboard\Transactions.tsx',
    'c:\Users\Rabiul\Desktop\humayan-rashid-portfolio\src\components\dashboard\Settings.tsx',
    'c:\Users\Rabiul\Desktop\humayan-rashid-portfolio\src\components\dashboard\Analytics.tsx',
    'c:\Users\Rabiul\Desktop\humayan-rashid-portfolio\src\components\dashboard\CommandPalette.tsx'
)

foreach ($file in $dashboardFiles) {
    if (Test-Path $file) {
        $c = Get-Content $file -Raw
        
        # Replace cyan colors
        $c = $c -replace 'bg-cyan-600 hover:bg-cyan-500 text-white', 'bg-[#cbf341] hover:bg-[#b2d932] text-[#061910]'
        $c = $c -replace 'bg-cyan-600 text-white dark:bg-cyan-500 hover:bg-cyan-700', 'bg-[#cbf341] text-[#061910] hover:bg-[#b2d932]'
        $c = $c -replace 'text-cyan-600 dark:text-cyan-400', 'text-[#cbf341]'
        $c = $c -replace 'text-cyan-600', 'text-[#cbf341]'
        $c = $c -replace 'text-cyan-500', 'text-[#cbf341]'
        $c = $c -replace 'text-cyan-400', 'text-[#cbf341]'
        $c = $c -replace 'dark:text-cyan-400', 'text-[#cbf341]'
        $c = $c -replace 'bg-cyan-500/10', 'bg-[#cbf341]/10'
        $c = $c -replace 'bg-cyan-500/20', 'bg-[#cbf341]/20'
        $c = $c -replace 'bg-cyan-500', 'bg-[#cbf341]'
        $c = $c -replace 'focus:ring-cyan-500', 'focus:ring-[#cbf341]'
        $c = $c -replace 'focus:ring-cyan-400', 'focus:ring-[#cbf341]'
        $c = $c -replace 'border-cyan-500/50', 'border-[#cbf341]/50'
        $c = $c -replace 'border-cyan-500/20', 'border-[#cbf341]/20'
        
        # Replace main container and card backgrounds to dark green
        $c = $c -replace 'bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60', 'bg-[#0b2e24] border border-white/10'
        $c = $c -replace 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800', 'bg-[#0b2e24] border border-white/10'
        $c = $c -replace 'bg-white dark:bg-zinc-900 border dark:border-zinc-800', 'bg-[#0b2e24] border border-white/10'
        $c = $c -replace 'bg-white dark:bg-zinc-900', 'bg-[#0b2e24]'
        $c = $c -replace 'dark:bg-zinc-900', 'bg-[#0b2e24]'
        $c = $c -replace 'dark:bg-zinc-950', 'bg-[#0a2219]'
        $c = $c -replace 'dark:bg-zinc-850', 'bg-[#0d3329]'
        $c = $c -replace 'dark:bg-zinc-800', 'bg-[#0d3329]'
        $c = $c -replace 'bg-zinc-50 dark:bg-zinc-950', 'bg-[#0a2219]'
        $c = $c -replace 'bg-zinc-100 dark:bg-zinc-800', 'bg-[#0d3329]'
        
        # Replace borders
        $c = $c -replace 'dark:border-zinc-800/60', 'border-white/10'
        $c = $c -replace 'dark:border-zinc-800/80', 'border-white/10'
        $c = $c -replace 'dark:border-zinc-800', 'border-white/10'
        $c = $c -replace 'dark:border-zinc-805', 'border-white/10'
        $c = $c -replace 'dark:border-zinc-850', 'border-white/10'
        $c = $c -replace 'border border-zinc-200 dark:border-zinc-805', 'border border-white/10'
        $c = $c -replace 'border border-zinc-200 dark:border-zinc-850', 'border border-white/10'
        
        # Replace text colors
        $c = $c -replace 'dark:text-zinc-50', 'text-zinc-50'
        $c = $c -replace 'dark:text-zinc-100', 'text-zinc-100'
        $c = $c -replace 'dark:text-zinc-150', 'text-zinc-100'
        $c = $c -replace 'dark:text-zinc-200', 'text-zinc-200'
        $c = $c -replace 'dark:text-zinc-300', 'text-zinc-300'
        $c = $c -replace 'dark:text-zinc-400', 'text-zinc-400'
        $c = $c -replace 'dark:text-zinc-500', 'text-zinc-500'
        $c = $c -replace 'dark:text-zinc-950', 'text-[#061910]'
        $c = $c -replace 'dark:hover:bg-zinc-200', 'hover:bg-[#b2d932]'
        
        # Clean up light-mode remnants and hover effects
        $c = $c -replace 'bg-zinc-900 text-white hover:bg-zinc-800 bg-[#cbf341] hover:bg-[#b2d932] text-[#061910]', 'bg-[#cbf341] hover:bg-[#b2d932] text-[#061910]'
        $c = $c -replace 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950', 'bg-[#cbf341] text-[#061910] hover:bg-[#b2d932]'
        $c = $c -replace 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200', 'bg-[#cbf341] text-[#061910] hover:bg-[#b2d932]'
        $c = $c -replace 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200', 'bg-[#cbf341] text-[#061910] hover:bg-[#b2d932]'
        
        Set-Content $file $c -NoNewline
        Write-Output "Done fixing $file"
    }
}
