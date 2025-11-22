import json
import os
import urllib.request
import urllib.parse
from pathlib import Path

# Configuration
BASE_DIR = Path('/home/ubuntu/slod-service/portfolio')
DATA_DIR = BASE_DIR / 'src/data'
PUBLIC_DIR = BASE_DIR / 'public'
LOGOS_DIR = PUBLIC_DIR / 'images/logos'
SKILLS_DIR = PUBLIC_DIR / 'images/skills'

# Ensure directories exist
LOGOS_DIR.mkdir(parents=True, exist_ok=True)
SKILLS_DIR.mkdir(parents=True, exist_ok=True)

def download_image(url, dest_dir, filename_prefix=''):
    try:
        # Parse URL to get extension or default to .png
        parsed = urllib.parse.urlparse(url)
        path = parsed.path
        ext = os.path.splitext(path)[1]
        if not ext:
            ext = '.svg' if 'simpleicons' in url else '.png'
        
        # Sanitize filename
        filename = filename_prefix + os.path.basename(path)
        if not filename.endswith(ext):
            filename += ext
            
        # Clean filename of weird chars
        filename = "".join([c for c in filename if c.isalpha() or c.isdigit() or c in '._-']).lower()
        
        dest_path = dest_dir / filename
        
        print(f"Downloading {url} to {dest_path}...")
        
        # Download with user agent to avoid some blocks
        req = urllib.request.Request(
            url, 
            data=None, 
            headers={
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'
            }
        )
        
        with urllib.request.urlopen(req) as response, open(dest_path, 'wb') as out_file:
            out_file.write(response.read())
            
        return f"/images/{dest_dir.name}/{filename}"
    except Exception as e:
        print(f"Failed to download {url}: {e}")
        return None

def process_experience():
    json_path = DATA_DIR / 'experience.json'
    with open(json_path, 'r') as f:
        data = json.load(f)
    
    updated = False
    for item in data:
        if 'logo' in item and item['logo'].startswith('http'):
            # Create a filename based on company name
            company_slug = item['company'].split('(')[0].strip().replace(' ', '_').lower()
            local_path = download_image(item['logo'], LOGOS_DIR, f"{company_slug}")
            
            if local_path:
                item['logo'] = local_path
                updated = True
    
    if updated:
        with open(json_path, 'w') as f:
            json.dump(data, f, indent=4)
        print("Updated experience.json")

def process_skills():
    json_path = DATA_DIR / 'skills.json'
    with open(json_path, 'r') as f:
        data = json.load(f)
    
    # Manual overrides for tricky slugs or fallback URLs
    # If simpleicons fails, we use these direct URLs
    fallback_map = {
        'C#': 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Logo_C_sharp.svg',
        'AWS': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
        'Azure': 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Microsoft_Azure.svg',
    }

    updated = False
    for category, skills in data.items():
        for skill in skills:
            if 'icon' in skill and skill['icon'].startswith('http'):
                
                skill_slug = skill['name'].replace(' ', '').replace('#', 'sharp').replace('++', 'plusplus').lower()
                
                # Try downloading original URL first (unless it's known to fail, but let's just try)
                # Actually, for the ones we know fail, let's just swap to fallback immediately if available
                
                url_to_download = skill['icon']
                if skill['name'] in fallback_map:
                    url_to_download = fallback_map[skill['name']]
                
                # Try downloading
                local_path = download_image(url_to_download, SKILLS_DIR, f"{skill_slug}")
                
                if local_path:
                    skill['icon'] = local_path
                    updated = True
    
    if updated:
        with open(json_path, 'w') as f:
            json.dump(data, f, indent=4)
        print("Updated skills.json")

if __name__ == "__main__":
    print("Starting asset localization...")
    process_experience()
    process_skills()
    print("Done!")
