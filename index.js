class Trie {
  constructor(value, parent = null, childs = {}){
    this.value = value
    this.parent = parent
    this.childs = childs
  }
}

/* 
  Given a word, we create a Trie using the first letter
  returning the root, his value is equal to the first letter
*/
function createTrie(word){
  let root = new Trie(word[0])
  let originalRoot = root
    
  for(let wordIndex = 1; wordIndex < word.length ; wordIndex++){
  
    if(!root.childs[word[wordIndex]]){
      root.childs[word[wordIndex]] = new Trie(word[wordIndex], root)
    }

    root = root.childs[word[wordIndex]]
  }

  return originalRoot
}

/*
  Given a word and a pre-builded Trie, we iterate in the word
  adding the child when necessary
*/
function addWord(root, word){

  let originalRoot = root
  
  for(let index = 0; index < word.length; index++){
    if(!root.childs[word[index]]){
      root.childs[word[index]] = new Trie(word[index], root)
    }

    root = root.childs[word[index]]
  }

  return originalRoot
}

/* 
  Given a Trie, console.log all the words that can be constructed
  traveling into his childs
*/
function travel(root, word=""){
  word = word + root.value

  if(Object.keys(root.childs).length == 0){
    console.log(word)
  }else{
    for(let childsKey in root.childs){
      if(childsKey != undefined){
        travel(root.childs[childsKey], word)
      }
    }
  }
}

function listWordsInSubTrie(root, word="", arrayOfWords){
  word = word + root.value

  if(Object.keys(root.childs).length == 0){
    let appended = arrayOfWords.push(word)
    return appended
  }else{
    for(let childsKey in root.childs){
      if(childsKey != undefined){
        listWordsInSubTrie(root.childs[childsKey], word, arrayOfWords)
      }
    }
  }

  return arrayOfWords
}

function recomend(root, word, arrayOfWords = []){
  let originalRoot = root
  let index = 1;
  arrayOfWords.push(word)
  let shouldContinue = true

  while (index < word.length && shouldContinue){
    if(root.childs[word[index]]){
      root = root.childs[word[index]]
      index = index + 1
    }
    else{
      shouldContinue = false
    }
  }

  word = word.slice(0, index-1)

  return listWordsInSubTrie(root, word, arrayOfWords)

}

function autocomplete(trieStorage, word){
  if(!trieStorage[word[0]]){
    return null
  }
  return recomend(trieStorage[word[0]], word)
}


/*
  For all the reserved words, create all the Tries
*/
function createTrieStorage(reservedWords){
  let trieStorage = {}

  for(let i = 0; i < reservedWords.length; i++){
    // If the keyword was not storaged, create the Trie
    // In other case, just store the keyword in the correct Trie
    if(!trieStorage[reservedWords[i][0]]){

      let root = createTrie(reservedWords[i])
      
      trieStorage[reservedWords[i][0]] = root
    
    }else{
      addWord(trieStorage[reservedWords[i][0]], reservedWords[i].slice(1))
    }  
  }

  return trieStorage
}


let reservedWords = ['function', 'functor', 'find', 'class']

let trieStorage = createTrieStorage(reservedWords)

/*
for (trieKey in trieStorage){
  travel(trieStorage[trieKey])
}
*/

console.log(autocomplete(trieStorage, 'f'))