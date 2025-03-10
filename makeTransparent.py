import os
from PIL import Image
import sys
from pathlib import Path

def convert_images(folder_path):
    # Check if folder exists
    if not os.path.exists(folder_path):
        print(f"Error: Folder '{folder_path}' does not exist")
        return

    # Get all jpg files in folder
    jpg_files = list(Path(folder_path).glob('*.jpg'))
    
    if not jpg_files:
        print("No .jpg files found in specified folder")
        return

    print(f"Found {len(jpg_files)} .jpg files")
    
    for jpg_file in jpg_files:
        try:
            # Open image
            with Image.open(jpg_file) as img:
                # Convert to RGBA to support transparency
                img = img.convert('RGBA')
                
                # Get image data
                data = img.getdata()
                
                # Create new data with transparent white pixels
                new_data = []
                for item in data:
                    # If pixel is white (or very close to white), make it transparent
                    if item[0] >= 250 and item[1] >= 250 and item[2] >= 250:
                        new_data.append((255, 255, 255, 0))
                    else:
                        new_data.append(item)
                
                # Update image with new data
                img.putdata(new_data)
                
                # Create output filename
                output_file = jpg_file.with_suffix('.webp')
                
                # Save as WebP with transparency
                img.save(output_file, 'WEBP', quality=90)
                print(f"Converted {jpg_file.name} to {output_file.name}")
                
        except Exception as e:
            print(f"Error processing {jpg_file}: {str(e)}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python makeTransparent.py <folder_path>")
        sys.exit(1)
        
    folder_path = sys.argv[1]
    convert_images(folder_path)
