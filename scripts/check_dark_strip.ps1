Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile("public\mobilya\mobilya-sanati-hero.png")

for ($x = 0; $x -lt 10; $x++) {
    $darkCount = 0
    for ($y = 0; $y -lt $img.Height; $y++) {
        $c = $img.GetPixel($x, $y)
        if (($c.R + $c.G + $c.B) -lt 60) {
            $darkCount++
        }
    }
    Write-Host "Column x=$x has $darkCount dark pixels out of $($img.Height)"
}

$img.Dispose()
