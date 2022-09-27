pragma solidity ^0.4.17;

contract Inbox {
    string public message;
    
    function Inbox(string initialMessage) public {
        message = initialMessage;
    }
    
    function setMessage(string newMessage) public {
        message = newMessage;
    }
}

// endpoint: https://goerli.infura.io/v3/007fef63db90417f830debae5a69b1eb