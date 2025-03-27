import requests
import json

url = "http://127.0.0.1:8000/api/atlip/group_portfolio/"

payload = json.dumps({
  "group_name": "TechCorp1",
  "group_email": "info@techcorp.com",
  "group_phone": "1234567890",
  "group_address": "123 Street, NY",
  "group_vat": "VAT123",
  "group_contact_person": "John Doe"
})
headers = {
  'Authorization': 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM5ODcwODU5LCJpYXQiOjE3Mzk4NjkwNTksImp0aSI6IjQ4YjA4ZWJiOWNjMDQwNGU5ZWZmZjM1YjNmYjM2NjkzIiwidXNlcl9pZCI6MTJ9.bs1Gv7rnEFLVfwX13U2L52SMeQWjXM_ATLr3uABtEPM',
  'Content-Type': 'application/json',
  #'Cookie': 'Cookie_1=ssRxOjzjjVyGnBD0raHlgr2PV6fDeXps; csrftoken=ssRxOjzjjVyGnBD0raHlgr2PV6fDeXps'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)
