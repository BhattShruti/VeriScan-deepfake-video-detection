$pdfPath = "c:\Users\91954\Desktop\Veri_scan\VeriScan_Deepfake_Detection (1) (3).pdf"
$bytes = [System.IO.File]::ReadAllBytes($pdfPath)
$text = [System.Text.Encoding]::ASCII.GetString($bytes)

# Extract sequences of alphanumeric characters (approximate text extraction)
$matches = [regex]::Matches($text, '[a-zA-Z\s\(\)\[\]]{4,100}')
$extractedText = $matches | ForEach-Object { $_.Value }

$extractedText | Out-File -FilePath "c:\Users\91954\Desktop\Veri_scan\pdf_extracted.txt" -Encoding utf8
