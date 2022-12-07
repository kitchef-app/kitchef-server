const express = require('express')
const app = express()
const port = 3000
const axios = require('axios');
const baseUrl = "https://kitchef-server-production.up.railway.app"

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.post('/', async (req, res) => {
	// console.log(req.body.data.sender.custom.receiverId, "receiverId");
  let receiverId = req.body.data.sender.custom.receiverId;
  let user = {}
	// app.get('') // get user/kurir detail ke db, idnya ambil dr receiverId 
	// if (req.body.data.sender.custom.role === 'courier') { 
    try {
      const { data } = await axios({
        method: 'get',
        url: `${baseUrl}/${req.body.data.sender.custom.role === 'courier'?'drivers':'users'}/${receiverId}`,
      })
      console.log(data, "hasil fetch");
      console.log(req.body.data, "hasil dari webhook");
      const message = {
        to: data.token, //ini didpt dr hasil return dr get
        sound: 'default',
        title: req.body.data.sender.custom.role === 'courier' ? 'Customer' : 'Driver',
        body: req.body.data.message.text,
        // data: { someData: 'goes here' },
      };

      await axios('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        data: message
      });
    } catch (error) {
     res.status(500).json({message: 'internal server error'}) 
    }
    // await axios({
    //   method: 'get',
    //   url: `${baseUrl}/${req.body.data.sender.custom.role === 'courier'?'drivers':'users'}/${receiverId}`,
    // }).then(data => {
    //   user = data
    //   return;
    // })
   
	// else { get ke user }

	// hit endpoint expo push notif
	

  res.status(200).json({message: "terpanggil"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})