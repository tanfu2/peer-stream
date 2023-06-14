echo off
start turnserver.exe -p 19201 -r "PixelStreaming" -X "??.??.???.???" -L "192.168.10.126" -E "192.168.10.126" ^
--no-cli --no-tls --no-dtls --pidfile "C:\coturn.pid" -f -a -v -n ^
-u "yskj":"yskj123"

Rem --min-port 19202 --max-port 19210 
Rem start turnserver.exe -p 19201 -r "PixelStreaming" -X "??.??.???.???" -L "192.168.10.126" -E "192.168.10.126" --no-cli --no-tls --no-dtls --pidfile "C:\coturn.pid" -f -a -v -n -u "yskj":"yskj123"
echo on