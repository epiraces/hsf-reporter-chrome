# HSF Reporter

Summary

This is a Chrome extension for the submission of potential spearfishing and malware samples to the HSF engine. It is a proof of concept in the context of a larger project named Harms Stories Framework (HSF). This extension, as a proof of concept, works only for Gmail. Other modules or plugins may be develop after this proof of concept for other providers or as extensions, add-ons or plugins for other browsers or email clients.

The objective of the extension is to lower the barrier for the submission of technically relevant information (full email headers, URLs and attachments) of potentially malicious email communications, as well as to facilitate the request for further context from an analyst or researcher. The extension also aims to test the hypothesis that simple incentives,in the form of automated analysis or guidance, can promote the submission of samples. The project also assumes, that an increased number of samples could enhance the ability of targeted populations to increase resilience as well as to access an ad-hoc early warning system and retroactive alarm mechanism.

How does it work?

The submissions are composed of the email of the submitter as well as the full headers extracted from the original message view provided by Gmail. Both are encrypted using OpenPGP.js and then sent to a server for relay or processing using HTTP POST. No decryption keys reside on the server.

After a successful submission, users will receive a ticket confirming the submission. Such receipt also contains a link where users can access a basic automated analysis of their submission. The design of the project also considers that they could add contextual information that may be of use for the analysts that will review the material, and that the extension itself could be a reliable way to communicate back to the submitter.

The current version is available in the Chrome Store at https://chrome.google.com/webstore/detail/hsf-reporter/jelkpbipoleejjoifbdlkljojmehaogl

Ideas and comments are welcome.

Cautionary notes:

- This project is not affiliated with OpenPGP, Gmail or any other organization whose code or services are used.

- The project is part of research done within the Open Technology Fund (OTF) Information Controls Fellowship Program (ICFP) and in collaboration with the University of Toronto Citizen Lab. That said, the author assumes all responsibility for this project.

- At this stage, this project should be used for educational or research purposes only. No third-party audit has been performed yet.