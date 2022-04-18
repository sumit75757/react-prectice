
////////////////////////get User by id ////////////////////////////////////
// route.get('/:userId', (req, res) => {
//             const id = req.params.userId;
//             usermodels.findById(id).exec().then(result => {
//                 if (result) {
//                     res.status(200).json(result)
//                     console.log(result)
//                 } else {
//                     res.status(404).json({
//                         code: "404",
//                         massage: "Not Found"
//                     })
//                     console.log(result)
//                 }
//             }).catch(err => {
//                 res.status(500).json(err.errors)
//             });
//         }