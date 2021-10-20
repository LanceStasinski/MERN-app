const fs = require('fs')

const userName: string = 'Lance';

fs.writeFile('user-data.txt', 'Name:' + userName, (err:any) => {
  if (err) {
    console.log(err);
    return
  }
  console.log('Wrote file.')
})

