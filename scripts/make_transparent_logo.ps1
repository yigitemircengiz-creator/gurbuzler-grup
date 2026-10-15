Add-Type -AssemblyName System.Drawing

$inputPath = "C:\Users\yigit\.gemini\antigravity-ide\brain\2dac7402-03fb-4ee8-a57f-9eac0361846e\.user_uploaded\media_1789310850066.jpg"
$outputPath = "public\logo-gurbuzler-grup.png"

$img = [System.Drawing.Bitmap]::FromFile($inputPath)
$w = $img.Width
$h = $img.Height

$outBmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $c = $img.GetPixel($x, $y)
        # Calculate grayscale brightness (0 = black, 255 = white)
        $brightness = [int](0.299 * $c.R + 0.587 * $c.G + 0.114 * $c.B)
        
        if ($brightness -ge 250) {
            # Completely transparent
            $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } elseif ($brightness -le 30) {
            # Solid black
            $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 23, 23, 23))
        } else {
            # Smooth anti-aliasing alpha
            $alpha = 255 - $brightness
            $outBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, 23, 23, 23))
        }
    }
}

$img.Dispose()
$outBmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
$outBmp.Dispose()

Write-Host "Created transparent logo at $outputPath"
