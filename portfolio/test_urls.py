import urllib.request
import urllib.error

def check(slug):
    url = f"https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/{slug}.svg"
    try:
        req = urllib.request.Request(
            url, 
            headers={'User-Agent': 'Mozilla/5.0'}
        )
        with urllib.request.urlopen(req) as response:
            print(f"SUCCESS: {slug}")
            return True
    except urllib.error.HTTPError as e:
        print(f"FAIL: {slug} ({e.code})")
        return False

slugs = [
    'csharp', 'c', 'cplusplus',
    'amazonaws', 'aws',
    'microsoftazure', 'azure'
]

for s in slugs:
    check(s)
