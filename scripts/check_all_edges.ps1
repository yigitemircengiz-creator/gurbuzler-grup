Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile("public\mobilya\mobilya-sanati-hero.png")

# Right edge
for ($x = $img.Width - 5; $x -lt $img.Width; $x++) {
    $dark = 0
    for ($y = 0; $y -lt $img.Height; $y++) {
        $c = $img.GetPixel($x, $y)
        if (($c.R + $c.G + $c.B) -lt 60) { $dark++ }
    }
    Write-Host "Right x=$x has $dark dark pixels"
}

# Top edge
for ($y = 0; $y -lt 5; $y++) {
    $dark = 0
    for ($x = 0; $x -lt $img.Width; $x++) {
        $c = $img.GetPixel($x, $y)
        if (($c.R + $c.G + $c.B) -lt 60) { $dark++ }
    }
    Write-Host "Top y=$y has $dark dark pixels"
}

# Bottom edge
for ($y = $img.Height - 5; $y -lt $img.Height; $y++) {
    $dark = 0
    for ($x = 0; $x -lt $img.Width; $x++) {
        $c = $img.GetPixel($x, $y)
        if (($c.R + $c.G + $c.B) -lt 60) { $dark++ }
    }
    Write-Host "Bottom y=$y has $dark dark pixels"
}

$img.Dispose()
