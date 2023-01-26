const { Environment } = require(`splashcard_jsmapper`)

export class Despawner {
  contains(ids = ["yodel"]) {
      this.contains = ids
   }
   regex(ids = ["uhh"]) {
      this.regex = ids
   }
   exact(ids = ["broski"]) {
      this.exact = ids
   }
   endsWith(ids = ["brosiff"]) {
      this.endsWith = ids
   }
   startsWith(ids = ["funny string here"]) {
      this.startsWith = ids
   }

   push() {
      this.contains.forEach(id => {
         new Environment("Contains", {
            id: id,
            position: [-9999, -9999, -9999]
         }).push()
        
      })
      this.regex.forEach(id => {
        new Environment("Regex", {
           id: id,
           position: [-9999, -9999, -9999]
        }).push()
      })
     
     this.exact.forEach(id => {
        new Environment("Exact", {
           id: id,
          position: [-9999, -9999, -9999]
        }).push()
     })
     
     this.endsWith.forEach(id => {
        new Environment("EndsWith", {
          id: id,
          position: [-9999, -9999, -9999]
        }).push()
     })
     this.startsWith.forEach(id => {
        new Environment("StartsWith", {
           id: id,
          position: [-9999, -9999, -9999]
        })
     })
   }
}
