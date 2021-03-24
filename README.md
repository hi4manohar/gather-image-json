### How to start the Project

Get pull from this repo
Use `npm i`
Start the project using `npm start`


### There are two routes exist
 - `/get-images` - Use this route to fetch all the images
  - On Success Respnse: 
  `{
    "status": true,
    "files": [
      {
        "filename": "img0000.jpg",
        "url": "/images/modelimages/img0000.jpg"
      },
    ]
  }`
 - `/get-images/imagename` - Use this route to fetch image metadata, Use imagename in the url without extension
  - On Success Response: 
  
  `{
    "status": true,
    "metadata": {
      "NA": {
        "code": "NA",
        "count": 8
      },
      "box": {
        "code": "box",
        "count": 11
      },
      "0048125184": {
        "code": "0048125184",
        "count": 1
      }
    }
  }`

 For the Project Requirements Do check `document.pdf` file