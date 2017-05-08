const sample = array => array[Math.floor(Math.random() * array.length)]

const ADJECTIVES = ['attractive', 'auburn', 'average', 'bald', 'beautiful', 'big', 'black', 'blind', 'blond', 'blue', 'brown', 'brunette', 'clean', 'curly', 'angry', 'mad', 'sick', 'cute', 'dark', 'dirty', 'fat', 'foreign', 'green', 'grey', 'hairy', 'handsome', 'heavy', 'hot', 'light blue', 'long', 'old', 'orange', 'pale', 'pink', 'pregnant', 'pretty', 'purple', 'red', 'red-haired', 'short', 'skinny', 'dancing', 'small', 'tall', 'tan', 'thick', 'thin', 'ugly', 'wavy', 'white', 'wide', 'yellow', 'young']

const COLORS = ['amaranth', 'amber', 'amethyst', 'apricot', 'aquamarine', 'azure', 'baby', 'beige', 'black', 'blue', 'blue-green', 'blue-violet', 'blush', 'bronze', 'brown', 'burgundy', 'byzantium', 'carmine', 'cerise', 'cerulean', 'champagne', 'chartreuse', 'chocolate', 'cobalt', 'coffee', 'copper', 'coral', 'crimson', 'cyan', 'desert', 'electric', 'emerald', 'erin', 'gold', 'gray', 'green', 'harlequin', 'indigo', 'ivory', 'jade', 'jungle', 'lavender', 'lemon', 'lilac', 'lime', 'magenta', 'magenta', 'maroon', 'mauve', 'navy', 'ocher', 'olive', 'orange', 'orange-red', 'orchid', 'peach', 'pear', 'periwinkle', 'persian', 'pink', 'plum', 'prussian', 'puce', 'purple', 'raspberry', 'red', 'red-violet', 'rose', 'ruby', 'salmon', 'sangria', 'sapphire', 'scarlet', 'silver', 'slate', 'spring', 'spring', 'tan', 'taupe', 'teal', 'turquoise', 'violet', 'viridian', 'white', 'yankees', 'yellow']

const ANIMALS = ['alligator', 'ant', 'bear', 'bee', 'bird', 'camel', 'cat', 'cheetah', 'chicken', 'chimpanzee', 'cow', 'crocodile', 'deer', 'dog', 'dolphin', 'duck', 'eagle', 'elephant', 'fish', 'fly', 'fox', 'frog', 'giraffe', 'goat', 'goldfish', 'hamster', 'hippopotamus', 'horse', 'kangaroo', 'kitten', 'lion', 'lobster', 'monkey', 'octopus', 'owl', 'panda', 'pig', 'puppy', 'rabbit', 'rat', 'scorpion', 'seal', 'shark', 'sheep', 'snail', 'snake', 'spider', 'squirrel', 'tiger', 'turtle', 'wolf', 'zebra']

export default () => (
  [sample(ADJECTIVES), sample(COLORS), sample(ANIMALS)].join('-')
)
