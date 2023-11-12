const express = require('express')
const multer = require('multer')
const cors = require('cors')
const upload = multer({ dest: 'uploads/' })

const app = express()

app.options('/upload', cors())
app.post('/upload', cors(), upload.single('file'), function (req, res) {
  let obj = { key: req.file.filename }
  res.send(JSON.stringify(obj))
})
app.get('/upload/:key', cors(), function (req, res) {
  res.sendFile(
    `uploads/${req.params.key}`,
    {
      root: __dirname,
      headers: {
        'Content-Type': 'image/jpg'
      }
    },
    (error) => {
      if (error) {
        res.status(404).send('Not found')
      }
    }
  )
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
