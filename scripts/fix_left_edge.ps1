Add-Type -AssemblyName System.Drawing

function Clean-Left-Edge($path, $cropLeft) {
    $tempPath = "$path.tmp.png"
    $img = [System.Drawing.Bitmap]::FromFile($path)
    $origW = $img.Width
    $origH = $img.Height
    
    # Destination bitmap with same dimensions
    $outBmp = New-Object System.Drawing.Bitmap($origW, $origH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($outBmp)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    
    # Source rectangle: skip $cropLeft pixels from the left
    $srcRect = New-Object System.Drawing.Rectangle($cropLeft, 0, ($origW - $cropLeft), $origH)
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $origW, $origH)
    
    $g.DrawImage($img, $destRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)
    
    $g.Dispose()
    $img.Dispose()
    
    $outBmp.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $outBmp.Dispose()
    
    Move-Item -Path $tempPath -Destination $path -Force
    Write-Host "Cleaned left edge of $path (cropped $cropLeft px)"
}

Clean-Left-Edge "public\mobilya\mobilya-sanati-hero.png" 6
Clean-Left-Edge "public\mobilya\bambi-chester-baslik.png" 4
