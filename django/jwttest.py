import jwt
from datetime import datetime


token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM4MDU4NjU4LCJpYXQiOjE3MzgwNTY4NTgsImp0aSI6IjYwZWRmZDEzZDY1OTRhYzk4N2Y3ZDZiYjMwZTY4MDYxIiwidXNlcl9pZCI6MTJ9.e_vjozl31s72Ymoo7KPLP_usuvJxq0OqzKJQt3FWtis"
decoded = jwt.decode(token, options={"verify_signature": False})
print(decoded)

token = decoded 


# Convert UNIX timestamps to readable date format
exp_date = datetime.fromtimestamp(token["exp"])
iat_date = datetime.fromtimestamp(token["iat"])
current_time = datetime.now()

# Check validity
if current_time < exp_date:
    status = "Valid"
else:
    status = "Expired"

# Print the results
print(f"Token Type: {token['token_type']}")
print(f"Expiration Date (exp): {exp_date}")
print(f"Issued At (iat): {iat_date}")
print(f"Current Time: {current_time}")
print(f"Token Status: {status}")
