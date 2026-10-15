Add-Type -AssemblyName System.Drawing

function Upscale-Image($inputPath, $outputPath, $scale) {
    $img = [System.Drawing.Image]::FromFile($inputPath)
    $newW = [int]($img.Width * $scale)
    $newH = [int]($img.Height * $scale)
    
    $bmp = New-Object System.Drawing.Bitmap($newW, $newH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    
    $g.DrawImage($img, 0, 0, $newW, $newH)
    $g.Dispose()
    $img.Dispose()
    
    $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Upscaled $inputPath -> $outputPath ($newW x $newH)"
}

$userUploaded = "C:\Users\yigit\.gemini\antigravity-ide\brain\2dac7402-03fb-4ee8-a57f-9eac0361846e\.user_uploaded"

# 1. Bambi Yorgan (350x181 -> 3x upscale)
Upscale-Image "$userUploaded\media_1789309845352.png" "public\dekorasyon\bambi-pamuklu-yorgan.png" 3

# 2. Rattan Salıncak (600x400 -> 2x upscale)
Upscale-Image "$userUploaded\media_1789309845395.png" "public\mobilya\rattan-asma-bahce-salincagi.png" 2

# 3. Rattan Oturma Grubu (600x400 -> 2x upscale)
Upscale-Image "$userUploaded\media_1789309845443.png" "public\mobilya\rattan-bahce-oturma-grubu.png" 2

# 4. Koltuk Şalı & Battaniye (350x266 -> 3x upscale)
Upscale-Image "$userUploaded\media_1789309845449.png" "public\dekorasyon\cizgili-puskullu-koltuk-sali.png" 3
