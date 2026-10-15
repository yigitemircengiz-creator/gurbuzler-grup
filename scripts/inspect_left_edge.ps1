Add-Type -AssemblyName System.Drawing

$img = [System.Drawing.Bitmap]::FromFile("public\mobilya\mobilya-sanati-hero.png")
Write-Host "Dimensions: $($img.Width) x $($img.Height)"

for ($x = 0; $x -lt 15; $x++) {
    $c = $img.GetPixel($x, [int]($img.Height / 2))
    Write-Host "x=$x : R=$($c.R), G=$($c.G), B=$($c.B), A=$($c.A)"
}

$img.Dispose()
