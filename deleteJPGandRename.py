import os
from pathlib import Path
import sys

def process_images(folder_path):
    # Check if folder exists
    if not os.path.exists(folder_path):
        print(f"Error: Folder '{folder_path}' does not exist")
        return

    # Get all webp and jpg files
    webp_files = list(Path(folder_path).glob('*.webp'))
    jpg_files = list(Path(folder_path).glob('*.jpg'))

    # Rename webp files
    for index, webp_file in enumerate(webp_files, start=1):
        new_name = webp_file.parent / f"{index}.webp"
        try:
            webp_file.rename(new_name)
            print(f"Renamed {webp_file.name} to {new_name.name}")
        except Exception as e:
            print(f"Error renaming {webp_file.name}: {str(e)}")

    # Delete jpg files
    for jpg_file in jpg_files:
        try:
            jpg_file.unlink()
            print(f"Deleted {jpg_file.name}")
        except Exception as e:
            print(f"Error deleting {jpg_file.name}: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python deleteJPGandRename.py <folder_path>")
        sys.exit(1)
        
    folder_path = sys.argv[1]
    process_images(folder_path)
