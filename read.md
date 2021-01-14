```
Confidentiality 
 
Alice creates a random key of size 128 bits and stores it in file symm.key.
This key will be used for the purpose of encrypting and decrypting data
using symmetric ciphers. 
openssl rand 16 > symm.key

Alice creates a file plain.txt, adds some dummy data to the file.
touch plain.txt

Alice encrypts the contents of plain.txt  to cipher.txt   using AES-128 
algorithm in CBC mode. Use symm.key for the purpose of encryption.
openssl enc -aes-128-cbc -in plain.txt -out cipher.txt -pass file:symm.key

Alice creates a 2048 bit RSA private key. Store in file alicepriv.key.
openssl genrsa -out alicepri.key 2048

Alice extracts the public key from alicepriv.key and store in file  
alicepub.key.
openssl rsa -in alicepri.key -outform PEM -pubout -out alicepub.key

Repeat step 4 and 5 to create private and public key of Bob. bobpriv.key 
and bobpub.key. Alice and Bob exchange their public keys.
openssl genrsa -out bobpri.key 2048
openssl rsa -in bobpri.key -outform PEM -pubout -out bobpub.key
cp alicepub.key ../bob
cp bobpub.key ../alice

Alice sends cipher.txt to Bob.
cp cipher.txt ../bob

Alice encrypts symm.key using the public key of Bob. Store in 
symm.enc.key.
openssl enc -aes-128-cbc -in symm.key -out symm.enc.key -pass file:bobpub.key

Bob decrypts symm.enc.key using his private key and stores the output 
in symm.dec.key.
cp symm.enc.key ../bob
openssl enc -d -aes-128-cbc -in symm.enc.key -out symm.dec.key -pass file:bobpub.key


 
Bob decrypts cipher.txt using symm.dec.key and stores the output in 
cipher.dec.txt. The cipher.dec.txt and plain.txt should have same
contents.
openssl enc -d -aes-128-cbc -in cipher.txt -out cipher.dec.txt -pass file:symm.dec.key

 
Integrity Check 
 
Alice computes sha-512 hash on plain.txt and store in hash.txt. 
sha512sum plain.txt >hash.txt

Alice verifies the hash. 
sha512sum -c hash.txt
output: plain.txt: OK

Make minor changes to plain.txt and check that verification of hash now
fails. 
sha512sum -c hash.txt
plain.txt: FAILED
sha512sum: WARNING: 1 computed checksum did NOT match

 
Authentication check 
 
Alice computes MAC on plain.txt using sha-512 and store in plain.mac.
openssl dgst -hmac -sha512 -out plain.mac -hex plain.txt
openssl dgst -sha512 -sign alicepri.key -out alicemac.sign plain.txt

Alice verifies the MAC.
openssl dgst -sha512 -verify alicepub.key -signature alicemac.sign plain.txt
output: Verified OK

Make minor changes to plain.txt and check that verification of MAC now 
fails. 
openssl dgst -sha512 -verify alicepub.key -signature alicemac.sign plain.txt 
Verification Failure
 
  
Digital Signature
 
Alice creates sha-512 hash on plain.txt and signs it using her private key. 
Store signed hash in file hash.sign.
openssl dgst -sha512 -sign alicepri.key -out hash.sign plain.txt

Alice sends plain.txt and hash.sign to Bob.
cp plain.txt ../bob 
cp hash.sign ../bob

Bob verifies the signature using the public key of Alice.
openssl dgst -sha512 -verify alicepub.key -signature hash.sign plain.txt 
Verified OK

Check that the verification fails if the file plain.txt is modified 
openssl dgst -sha512 -verify alicepub.key -signature hash.sign plain.txt 
Verification Failure 

```
