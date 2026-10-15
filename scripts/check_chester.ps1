Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile("public\mobilya\bambi-chester-baslik.png")
Write-Host "bambi-chester-baslik.png Dimensions: $($img.Width) x $($img.Height)"

for ($x = 0; $x -lt 10; $x++) {
    $dark = 0
    for ($y = 0; $y -lt $img.Height; $y++) {
        $c = $img.GetPixel($x, $y)
        if (($c.R + $c.G + $c.B) -lt 60) { $dark++ }
    }
    Write-Host "Column x=$x has $dark dark pixels"
}

$img.Dispose()
