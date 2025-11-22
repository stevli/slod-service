import os
import requests

images = [
    ("hero_bg.jpg", "https://drive.usercontent.google.com/download?id=1A368LomUSdVd7gVpZPWi52sMSMR7c3w5&export=view&authuser=0"),
    ("icon_walmart.jpg", "https://drive.google.com/thumbnail?id=1BYGkB-VPzo5A9tVrCC8AUdX6g3SpHUJZ&sz=w1000"),
    ("icon_ur.jpg", "https://drive.google.com/thumbnail?id=1XJqn7xcCcUyKNgU2hOOoJclAstedY_xq&sz=w1000"),
    ("project_slod.jpg", "https://drive.google.com/thumbnail?id=178x3R7arZZxc1hHhyWhMMgud1LsDOJaJ&sz=w1000"),
    ("project_rushkeep.jpg", "https://drive.google.com/thumbnail?id=1-ROFjGqVmsUb6T4n2zVucLyzlJdvcwMj&sz=w1000"),
    ("project_banana.jpg", "https://drive.google.com/thumbnail?id=1Skkd_4esIOvTu9JRCpLflQ0V52nkd475&sz=w1000"),
    ("project_portfolio.jpg", "https://drive.google.com/thumbnail?id=1vxozCqkL6F8hyDeIpjUAQINuXMT_Yt9R&sz=w1000"),
    ("project_mobilegame.jpg", "https://drive.google.com/thumbnail?id=1e1yfyPIcu3KR03dBL_Lo0n-gIPURAq-X&sz=w1000"),
    ("project_orange.jpg", "https://drive.google.com/thumbnail?id=1Z3pb0rxuFzOQ6tB3jPyrpQZpMLfZJkdS&sz=w1000"),
    ("project_beatbot.jpg", "https://drive.google.com/thumbnail?id=1S8mtrydC94e3zmeb8pMl4392a6xgTqeu&sz=w1000"),
    ("logo.jpg", "https://drive.google.com/thumbnail?id=1HmvhMnjZZuFkpw60xHm8SG2eAFQbWjJU&sz=w1000")
]

output_dir = "portfolio/public/images"
os.makedirs(output_dir, exist_ok=True)

for name, url in images:
    print(f"Downloading {name}...")
    try:
        response = requests.get(url, allow_redirects=True)
        if response.status_code == 200:
            with open(os.path.join(output_dir, name), 'wb') as f:
                f.write(response.content)
            print(f"Saved {name}")
        else:
            print(f"Failed to download {name}: Status {response.status_code}")
    except Exception as e:
        print(f"Error downloading {name}: {e}")
