$ErrorActionPreference = 'Stop'
$output = Join-Path (Get-Location) 'all-active-public-pages.docx'
$temp = Join-Path $env:TEMP ('page-links-doc-' + [guid]::NewGuid())
New-Item -ItemType Directory -Path "$temp\word\_rels", "$temp\_rels" -Force | Out-Null

$sections = [ordered]@{
  'Main Pages' = @(
    @('Home', '/'), @('About Us', '/about'), @('Contact Us', '/contact'), @('Contact Us Alias', '/contact-us'), @('Aviation Services', '/services')
  )
  'Course Pages' = @(
    @('Commercial Pilot License Course', '/courses/cpl'), @('ATPL Course', '/courses/atpl'), @('Cabin Crew Course', '/courses/cabin-crew'), @('Ground Staff Course', '/courses/ground-staff'), @('Airline Preparation Course', '/courses/airline-preparation'), @('Air India Pilot Interview', '/courses/Air-india-pilot-interview'), @('IndiGo Pilot Interview', '/courses/Indigo-pilot-interview'), @('ATPL Course Alias', '/air-transport-pilots-license-atpl'), @('Best ATPL Classes Alias', '/best-atpl-classes-in-india'), @('Commercial Pilot Training Alias', '/commercial-pilot-training'), @('Best CPL Ground Classes Alias', '/best-cpl-ground-classes'), @('Commercial Pilot Training in Dwarka Alias', '/commercial-pilot-training-in-dwarka'), @('Courses and Careers Alias', '/courses-and-careers'), @('Commercial Pilot Training CPL Alias', '/commercial-pilot-training-cpl'), @('Pilot Course Alias', '/pilot-course'), @('Aviation Courses and Careers After 12th Alias', '/top-aviation-courses-and-careers-after-12th'), @('Careers Alias', '/careers')
  )
  'Aviation Services' = @(
    @('Charter Services', '/services/charter-services'), @('Aircraft Management', '/services/aircraft-management'), @('Aircraft Sourcing and Sale', '/services/aircraft-sourcing-sale'), @('Aviation Consultancy', '/services/aviation-consultancy'), @('MRO Services', '/services/mro'), @('Livery Painting', '/services/livery-painting'), @('CAMO Services', '/services/camo'), @('Components and Spares', '/services/components-spares')
  )
  'DGCA and Pilot Training' = @(
    @('DGCA Training', '/dgca'), @('DGCA Full Form', '/dgca/full-form'), @('DGCA Medical Guide', '/dgca/medical'), @('DGCA Ground Classes', '/dgca/ground-classes'), @('RTR Guide', '/rtr'), @('DGCA Ground Classes Alias', '/dgca-ground-classes-training-classes'), @('CPL ATPL Ground Classes Alias', '/cpl-atpl-ground-classes-2'), @('Pilot Training', '/pilot-training'), @('Pilot Training in India', '/pilot-training/india'), @('Pilot Training in USA', '/pilot-training/usa'), @('Pilot Training in New Zealand', '/pilot-training/new-zealand'), @('Pilot Training in South Africa', '/pilot-training/south-africa'), @('Pilot Training in Australia', '/pilot-training/australia'), @('Training in Australia Alias', '/training-in-australia'), @('Training in South Africa Alias', '/training-in-south-africa'), @('Training in India Alias', '/training-in-india')
  )
  'Become a Pilot' = @(
    @('Become a Pilot', '/become-a-pilot/become-pilot'), @('Commercial Pilot Licence', '/become-a-pilot/commercial-pilot-licence'), @('Airline Transport Pilot Licence', '/become-a-pilot/airline-transport-pilot-licence'), @('How to Become a Pilot', '/how-to-become-a-pilot'), @('How to Become a Pilot in India', '/how-to-become-a-pilot-in-india'), @('How to Become a Pilot in India with Trailing Slash', '/how-to-become-a-pilot-in-india/'), @('How to Become a Pilot in India After 12th', '/how-to-become-a-pilot-in-india-after-12th'), @('Guide on How to Become a Pilot', '/guide-on-how-to-become-a-pilot'), @('Training in India with Trailing Slash', '/training-in-india/')
  )
  'Location and Sitemap Pages' = @(
    @('Locations', '/locations'), @('HTML Sitemap', '/sitemap'), @('HTML Sitemap Case Variant', '/Sitemap')
  )
  'Blog Pages' = @(
    @('Blog Index', '/blogs'), @('Blog Post 1', '/blogs/1'), @('Blog Post 2', '/blogs/2'), @('Blog Post 3', '/blogs/3'), @('Blog Post 4', '/blogs/4'), @('Blog Post 5', '/blogs/5'), @('Blog Post 6', '/blogs/6'), @('Blog Post 7', '/blogs/7'), @('Air Hostess Salary in India 2026', '/blog/air-hostess-salary-in-india-2026')
  )
}

function XmlEscape($text) { return [System.Security.SecurityElement]::Escape($text) }
$body = New-Object System.Text.StringBuilder
[void]$body.Append('<w:body>')
[void]$body.Append('<w:p><w:pPr><w:pStyle w:val="Title"/></w:pPr><w:r><w:t>All Active Public Page Links</w:t></w:r></w:p>')
[void]$body.Append('<w:p><w:r><w:t>Flying Star Aviator | https://www.flystar.co.in</w:t></w:r></w:p>')
[void]$body.Append('<w:p><w:r><w:t>Inventory date: 27 August 2026 | Total concrete public URLs: 67</w:t></w:r></w:p>')
$relationshipId = 1
$relationshipTargets = @{}
foreach ($section in $sections.GetEnumerator()) {
  $heading = XmlEscape $section.Key
  [void]$body.Append("<w:p><w:pPr><w:pStyle w:val=""Heading1""/></w:pPr><w:r><w:t>$heading</w:t></w:r></w:p>")
  foreach ($page in $section.Value) {
    $name = XmlEscape $page[0]; $url = "https://www.flystar.co.in$($page[1])"; $escaped = XmlEscape $url
    [void]$body.Append("<w:p><w:r><w:t>$(($page[0])): </w:t></w:r><w:hyperlink r:id=""rId$relationshipId""><w:r><w:rPr><w:color w:val=""0563C1""/><w:u w:val=""single""/></w:rPr><w:t>$escaped</w:t></w:r></w:hyperlink></w:p>")
    $relationshipTargets[$relationshipId] = $url; $relationshipId++
  }
}
[void]$body.Append('<w:p><w:pPr><w:pStyle w:val="Heading1"/></w:pPr><w:r><w:t>Dynamic Route Patterns (not individual pages)</w:t></w:r></w:p>')
foreach ($path in @('/dgca/:topic', '/pilot-training/:topic', '/locations/:location')) { [void]$body.Append("<w:p><w:r><w:t>https://www.flystar.co.in$path</w:t></w:r></w:p>") }
[void]$body.Append('<w:p><w:pPr><w:pStyle w:val="Heading1"/></w:pPr><w:r><w:t>Excluded Routes</w:t></w:r></w:p>')
foreach ($path in @('/admin/login', '/admin/blog', '/api/')) { [void]$body.Append("<w:p><w:r><w:t>$path</w:t></w:r></w:p>") }
[void]$body.Append('<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr></w:body>')

$documentXml = "<?xml version=""1.0"" encoding=""UTF-8"" standalone=""yes""><w:document xmlns:w=""http://schemas.openxmlformats.org/wordprocessingml/2006/main"" xmlns:r=""http://schemas.openxmlformats.org/officeDocument/2006/relationships"">$body</w:document>"
$rels = New-Object System.Text.StringBuilder
[void]$rels.Append('<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">')
for ($id = 1; $id -lt $relationshipId; $id++) { [void]$rels.Append("<Relationship Id=""rId$id"" Type=""http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink"" Target=""$(XmlEscape $relationshipTargets[$id])"" TargetMode=""External""/>") }
[void]$rels.Append('</Relationships>')

$files = @{
  '[Content_Types].xml' = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>'
  '_rels/.rels' = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'
  'word/document.xml' = $documentXml
  'word/_rels/document.xml.rels' = $rels.ToString()
}
foreach ($file in $files.Keys) { $target = Join-Path $temp $file; New-Item -ItemType Directory -Path (Split-Path $target) -Force | Out-Null; [System.IO.File]::WriteAllText($target, $files[$file], [System.Text.UTF8Encoding]::new($false)) }
if (Test-Path $output) { Remove-Item $output -Force }
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($temp, $output)
Remove-Item $temp -Recurse -Force
Write-Output $output
