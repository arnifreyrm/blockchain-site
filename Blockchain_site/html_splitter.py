import sys

#Get string from input and encode to hex
html_string = (input()).encode('utf-8').hex()

#returns utf-8 encoded byte size
def utf8len(s):
    return len(s.encode('utf-8'))


split_list = []
temp = ''

#Iterate over every character until a 80 byte data slice is made
for char in html_string:
    if utf8len(temp)<80:
        temp = temp+char
    else :
       split_list.append(temp)
       temp = char
if temp != '':
    split_list.append(temp)
for item in split_list:
    print (item)



