//your JS code here. If required.
// Task 1: Decrypt Caesar's cipher
function decryptMessage(encryptedMessage, shift) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerAlphabet = 'abcdefghijklmnopqrstuvwxyz';
    let decryptedMessage = '';

    for (let i = 0; i < encryptedMessage.length; i++) {
        const char = encryptedMessage[i];

        if (alphabet.includes(char)) {
            const originalIndex = alphabet.indexOf(char);
            const newIndex = (originalIndex - shift + 26) % 26;
            decryptedMessage += alphabet[newIndex];
        } else if (lowerAlphabet.includes(char)) {
            const originalIndex = lowerAlphabet.indexOf(char);
            const newIndex = (originalIndex - shift + 26) % 26;
            decryptedMessage += lowerAlphabet[newIndex];
        } else {
            decryptedMessage += char; // Non-alphabet characters stay the same
        }
    }
    return decryptedMessage;
}

// Task 2: Merge Sort to sort messages by date
function merge(left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;

    // Concatenate values into the result array in sorted order
    while (leftIndex < left.length && rightIndex < right.length) {
        if (new Date(left[leftIndex].date) < new Date(right[rightIndex].date)) {
            resultArray.push(left[leftIndex]);
            leftIndex++; // move left array index
        } else {
            resultArray.push(right[rightIndex]);
            rightIndex++; // move right array index
        }
    }

    // Concatenate any remaining elements
    return resultArray
        .concat(left.slice(leftIndex))
        .concat(right.slice(rightIndex));
}

function sortMessages(messages) {
    if (messages.length <= 1) {
        return messages;
    }

    const middleIndex = Math.floor(messages.length / 2);
    const leftArray = messages.slice(0, middleIndex);
    const rightArray = messages.slice(middleIndex);

    return merge(sortMessages(leftArray), sortMessages(rightArray));
}

// Task 3: Store sorted messages in Local Storage
function storeMessages(messages) {
    localStorage.setItem('messages', JSON.stringify(messages));
}

// Example usage:
const encryptedMessages = [
    { date: '2024-09-10', content: 'Ebiil Tloia!' },
    { date: '2024-09-12', content: 'Ymnx nx f xywnsl!' },
    { date: '2024-09-08', content: 'Mjqqt Btwqi!' }
];

const shift = 5;
let decryptedMessages = encryptedMessages.map(msg => {
    return {
        date: msg.date,
        content: decryptMessage(msg.content, shift)
    };
});

let sortedMessages = sortMessages(decryptedMessages);
storeMessages(sortedMessages);

console.log('Decrypted and sorted messages saved to Local Storage.');
