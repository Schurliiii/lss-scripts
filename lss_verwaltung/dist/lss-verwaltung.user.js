// ==UserScript==
// @name         LSS Verwaltung
// @namespace    https://github.com/Schurliiii/lss-scripts
// @version      1.4.0
// @description  Fuhrpark, Personal, Wachen, Ausbildungen und Ausbauten in Leitstellenspiel.de auf einen Blick – mit Bearbeitung direkt im Panel.
// @author       Schurliiii
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAHkklEQVR4nKRXW4xdVRn+1tprn7mcMx1mCh1KNFaNCuMFialBQpNmgggGG280xECIl8iTBmNi0oChRokvPthqLPqAd5NCDEaoUSNpglJ4QA2xwVYosW1SrJ1pZzrTc87ee138/rX2udXBUFntmv/svdb6/++/r22wzgh7925A59xWjDfeBo8rfGamkGUNrYJBlgNKZV4prbVSst/7EOCc56ODq+CDsnwutcMqtD0Dh5dwvnhW7d69drEsNSL4G/fdHiZb9yJTN8B5QHM51IuZ4dR8lyWq5LdOa557A6ec8S5RZwcSfBDQPKIPoaj2qq/cv/+/ALhv7v4WQvgyym5iHAVlcgiBU2XpWd4HLcyyiE2JEWiAQMFKBEUADsHJs+d7H5/je/ndGBfwe7JdD9zbB2CpufLuEXSKUS21aC3CBtpHMJyOQtVlM/DL52goDS1wosAaCC0wEF5bpH6PiQnhs9Pc/+CjJpq+qr6ItdUkOIiW3BgoMBOmZJ2JhmIFChCNOUvrMP7pe8DdKPbtQU6Aok2oBapaeAI07B7OlWVgavoL3P6oCXfd1XRFdSMskYlLqVkEQIERsbhDtBUqjCncU+Nuu43JDdPRfd0LF2AmxqHE1RILfhALA+FDFpB3nfY2kW3s9NhWtNcQbEUhYkLxu4Onv4OYkTTzWQQifhftGeWw3W4/eKtOh3h5ToVodgHhxR11LGSiVC8mIuV7+UfZOrjqzYHmRGWjQKGe1vDdEuqmW6EXPkQBBd3E9aoEyorMSKtqkD7y29bvOD33ui7PXPd+ZLffSbD8TZ4y0aMVQdhii/FVOZuiV8wkQSaaa9i5zWjd/OGUIdSgOvArmDxPrqC3FcEuP/l72BUGoZi7LKNWTrQUIddvw8TOT8XzxYHHgFdORUvEmBDLCNhMbzTK+WYoa2188j+LDNrHjsH+9glcdsttmCCQztIS7KGnGGwm5s4Yt5//xU9i4G2YnIiaJ0tb6A9sw+Qdd0aWiz//MfxLx9Bq5FxPaRoDVdRo5E1dFkUeiiKaN4gWZQHFeDDB4cxD38PSbx5Pm9/yVpq1C1d04z7NPRuMwVSeQYtGPOc5LePBbL0+njn9sx9h+Zf7kTMmlO3xL6P2gXysdbnR1mYQ4UrSjIyY8xIkOVNitmFwbt93sfbUQYQX/4GZ5qRU3JgYamYjsk1zqcKd/hfc2aXkLvJaevj7KKitPfICZscaaEhmlD4VLLpHgjRIZpiS9iyK4IsyVTc+Bm1jtGeUkpP5DDV0Lx6BkYoorrp6HmbHx9GYf9dwFUf5wmFUjz8G9fxfkBHsGJWYooXy6HPJLis9o1+QREn6LxiJeE3UMcUkb6XcsqdI2TUEIEAk7TzNbG66Bc3PfD71B2EU6lpK2njH1Wi8fRfwwx9A/e4AWBVicMY60EvDmvbqhKS6YXqpIBbIUp73Sm2fEoQTM1/7PjTv/mwqKpToT57kPA5zwzYMI2ne/TmcP3EC9vk/oyE4KVCHuj5w+vicXBAyo4yiC2J+Ox2Ljvg00QRCAFgymNrxsYReesczT8M++zTym28ddL2hMbbjo1jluhelXCo6AjwEcUeIFDZaO0gdCJAskIbCA55Cdd8SFC6OunIzxq6ZjwAcfW2f+SMan7gD+g1v7IMaAXDNO7EyMwt3+pXYpKTO9CpkTEEnlZKWMAKgqIKiC6T30ySx1ocs9fqgsmjWcPmmWpCY/gQyBqLefFWtvRpxQZ9u2oRw4ng6X/eH4KTJ9Vo1eZmKAOQ6E6tSCkIRrH1WXzg8yiCFCQNNyUgArKf58JBVJfkuVISHFAP9mEi9QQAwNiU6YzdMHVAaSS8QJQMi8trX+faFWoL9nwDkjGVPkBbZv5hIGhKIlGtEYLzjlbz0SWBEs4mvgo31gNsiAFYJmKpuoeHVLJ6uXMPvK2ovRakhOR/btEN9gexvoqowiIlRMwv1BZDWkOCb3PlJXPXA16GbLVzqeNPDP4W/sIbFr30V7Uf2U1AYtk8ETPs6zU5cWfEAkVmiFVqRFjTxJLvZ/yO8N+Ss8CioYjXEP1Ip1Xxt+HfNxQBMUR7/02YCIvRuva9jCA8RLhVV1fyjT3i9Z6Vc00Vpl+Q2Y5kBcYoF4u+Aleeew+sdwkN4VUP8hfJbA2wAZw0D8XgIEu2DCAo1ffm+XTh96E/Qk80RD76WETm0L2D1wBOYpoWFfxiK3JgVK+dfVoe3b2/pf59arRYXRwJbHFLxUCFpmYrpyHpvvFpiyOAtETkLXCMG3Oi6ufwKtJdXm3Hv4eve82R18uQC6o+MHvW9jw6Mvn+tVOlE9Trr5sq5P7z7b3//YPwucIXdg+mZBXvu7JBe69BwaTQWMA5/ER8zww8a57+TrMTx0JkzR+/ZsmWclfBG12mjLktR81Cbf/156esZm5TOGw++98jRfb1Y6Y9Dc3O3mY0bv8T73YLvdOMRuSv4ePkI9cT6QTD8rNPXk+aNSOWNuK75OZa1WgdDp/vtrUeP/rq3fQRAbxycn2+NLy9f6/J8S1ZVs86YFktorqVPS/QqFavr8BlGNW/0WfCpzrPj6Crzfo3BfJb0n4unTv31I0D7Yln/AQAA///3Mjn6AAAABklEQVQDAKhrLHgd0OzlAAAAAElFTkSuQmCC
// @icon64       data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAQAElEQVR4nORbe4wd1Xn/zpm5d+8+7dgG2+Ai1TwMGHAAYxtcKgSkUYtIrarpH63aKKnU0tZtREsQbSIeCkRBwkrTf5Kq4Q8gSRvStEDVNFWVimJiGwyu8INgJ6KqkZvFjtder9e799455/R7nZkzd3e9DsWYpGOPZ848znyP3/c81xb+n2/5T/Jw+MLnboTh4Y1g81VgzEVgs/Mh+CEwMARg+iDLmiFAZgAysNbiMyA7/cGjtTwAPlia0sSpcR4AH+gEjPcBNzA8DMC79/gAODw6vNDBa238/iQeJ8C7w5A3DkH71OtQmJfNXZtfOFOezHwPhMc+++uhNfDxkOe/YLrdESgKJIZ2L0wokwF3gzzHY8W8nltTe758jxjlD4VkF2GU54Hk4/m54ByPTe/z9E2L+sxzMI1sPIDdborOE2bzp/7uHQmg+Pz9d2QjCx8J09Nr4NSkPMqMQcIIfbRnXDJ7mnG615gHZdir1isBzDoWZMwuPJpsAME5NLgbJk8+YO7+i2fOWADuC597FJy/FybGZ2g5ZcrYTCZJNB/imFCfVeMogHIsJNaIiFpOmeRrzJcTBCRIoCNbRg9iZqBjcBj8wMCWxuZ77plXAO6xhx+FTudeOHWyrrFeWCdaNbNCPH0mRYB+VuHPI7oXVGsBZtFyr+bVXyQmMhMtPc8jGmBkaEu2+d575hRA8fmHfhUdyjPmxHii0QrCpPFgEg2z5qEUQokERgtew/d8iQiaRu4Tl6xH0rB+mz8RIlHCHGnSKwKiZvk6XvPsO3DsFBERITyuIycKwgwPQ8gam/L7Hng28mxTAdjcPgDHxmrSNPRhH52OnIOX63FsU6l7haMeTbITMR6dqCvw2EVHPrIA7BWrIXTlGhEdHDpY58u5jDJcapQZAvl+pEufk2P13Si0eA/Gx8G2+h6cFQHhoU9/1Pnu03ByooRy1Gg0AZP6AVtpms5JH5bGaiqscTyvECCaL5gHD807N0F+5dWCvNf3QOefnuEomVkjURNCqfFo90bPI/Qty70yAWI+JMqI71fmgMehYfxG4zfMA498s4YA19f8GJw4odpLvGki3ehoWCMuue9CKXkel5oJqkE8p/DFxwKKTrtknom48CLodqZ5XnZu/GyFAltDl4yNr67R9yMy4vdLv1Aih57F+2jebnjo4/HbZSIU2u2NBuEZWLM0AWkziIZJkqxZsknDtm3YowdFBEna6H3RvEQNz7ZurRfa8J8OQn96ug0jqektWABtvJbjO1mWg6ZLarqaB8SokEQHgKhh/K4igvIk1qoiJYREIIQQUsrJiRtrPqBz3ydvMNNTC6EmWdJWYsuqcVv6AZ/c96Wd2tDjA4KghbTEDgr3otOF3q1od9AvFIIUmpe/55L5Q+07EWHRX1i9z2hJ0Fk7j/RMTS3sPvzpm0oEZIODG/zYGH/cs8mTBr3YLmmWRMuhCjVqyNYDI4WeIURk8X7MCOl+OY9cC+q4XNHFZHKmAByiz6N5ELpCDJdR2xBK8wtJFhg4SojGjSY/3ikCFPbRh4BGDfI/dnoKnwlr8KltLAB853KDEGQJGmUYBLNiDlDGebqNbOCkMQSSwij1z9gETBIW2eh4rA+qRggJvRsRHgqyH6e4THICqIQhjk3CmzCHSkNCOFoRmbXcIUar6hojFHl1CxZdVSLAgPu5gE6oTF6CapCZAgnQ6hM8Jyx4celSsJdcBmHsGBQHvo9ZX4b2a1nrLDRFgGR+GmxcDHMOZkLASY3hTGnbHAvU1vmvajxoSLVLkIaLL4Zw9Ci4N/aBirkSQrR56HHsxTTzXAoAZ13KNyxpCIWQkY1Z0SAnQp5h6QMVYzjhlVdB/x/dLa9i3mB2vgTtbz+LHyaB4Z6jEII4QdFehQAT7bBnK2M9oYPMiKGvnhuqcEiJEZlKtmo1tO7645KG9tefAP/9vQgeI8qLsO/NEn1ZXC2ld8VhFm6ENBM4GZGjd108FjJ2MnbdLnTRfs3KS0rC7QcWQXbDemj8ykeg3UZoUYKDz7GmC9E2nfuiy/PQThqa3PVKOQedM1YIIQRpfJ+eh8Jx2OT3cV6PztNhCDWXXQ79ynykgWjq4nvkY6pvFcwD0U4JGI/j9en2cIWAbneIpUQaI82jxqMjjGNQSyBbndyxDVq/fGdJQIYEwA0b+Lz97LfEhWSh9Bmg6TFpz/JHDRz6yy2w6COb+J2x556BkYH+MtHhVkKEcAyFKJwuMmFXXw2Df/DJGQhq/+AARxEyxTK9K7NBmK1eqARgXNEkWDF8iVmGMjmjTLL2IJkez4NETB54A+BrT8Di3/rYTCHgR0gIeQN9As4nOYMimXIC1DDF+/48g+PP/SPDuz9v4DWSmSQ0VZEj1Z7j6IHMX3kNDP3hTOZH/2oLdLa/CEONJlDGIb7HV07UR18ApQnYomiWAkDItySDAfEB5IlZdU6Q4ET9qZM58s1vYPPFwNLf/J26ENZtgOKH+8Hv24vyxPZQkFBI0YWTFZyhQXNj46KZWSYyQ403jJX018XII+HPF2L3GWaOg5vvnsH8wS9ugZPPfxdG+pr8HucDRrNCqGze1KpEzjhblQC8z4OmqgFfNko0I4EkqdUgkU9hhBjI8dro17/K2lqWImHRYmisuxFO7XoVbLMB3hqGNNNDTCIBDTrNyCQkE6caIKcnyGdQBRmC1vri7YtOAf3rNsxg/r+R+fF/+w4M9fUxI5bQgkLIDWgVSfmHq/KGmEyJYJh3qwLIYkZlfJJJFa70zJTBWTSTHC+TAAYRwrQf/tpTMIrmkG7dHx9B3ycOJ8Z9ztdxPqMaIBQ1kdCmiWFLs7yiyhrFgXr2O+0f7O9h/jEY/9d/gQE0nwGko4lCJtoyL7RK5ui0ThCeTMwg2dn6DBIfkEmv0Wvll0kaSj7Ax44Oq41tqwFaCZLDyR28/dUnYWL3a7Ds1z4K7ugRGHv8b2CohfaI75vMc3h03msTRK2L7ForRIr3Ui1oHxXkGUIACZIEMP36Xgjffg6yxefB+LYX4QRqfgARNpRbQWRPyBQfQihWZIeqr8DldNGpBICaMiwhLWuFSrJJNn6VOUG54OtELL3dz/G+wfbd2bsHDu3bzY6vhcyTNmyg7M4iLCVLYweF7Slz6WWQnb8Uz4fENCZPgj/8NoQfHgA3McElsQ/qbzz5EQ/TBw7Aib17JRKgQoYapPkccvQjTcnKkQ7NJZgpsntJmljIZaMkqG/g5ETDYCEZGqW3ohTStKs6QJr2GvUJ3P3BJ7BuQ+jROTo0U7BGM7zXAK0byKZBEJivXQd9t9wOzTXXwum2zmu7oPP8v0P3lR08l1R7YioU4hpWwmjDiuabSSMkqM1Lw0SyVpNkgzGDJIqJ50oAILZqrJa3Qfp0JEExCR1TUqSNEas67SM0oENzJpeJGb7SM+CYvvxCGMBI0bz+hlIzp9ua11zLe+fVnZjdPQn+R4fYUZHjbHKDxbIGCSV5EEcHGqRNqCPAajFkQk9dwAJzUEMA5QEWNc3Vno11vI5pIu0KxRyd7Zjuo1RzKz0DimouSGVGsbtx7VpMWv4E7MhIaXvlJnTPOW5edz3kF18KE1/6Irj/fJUDEZkaRaGMfEbsBYI41KBhz/s4lslC2RmS74cYBbQg0yiA7NGFUHVjrPfqRZ0WKp7TUg5VIY4d26eh5Ea9OHlhSloaa66D4T+7D5kfhlqHt3eHue9ZbGIuuOfPeS7O8ryk0aQ9/i4ebdk/lLQ50i90x/6CIJzHXsZBfYAEYq+5creqAYgJrg1i/lzEGqHgJiY/r/m10Q9gTcEdH3P+Mhi4a7OYj0uKnKStFY4dq1/vuV+OUV8Dv49zLV0GRVfqEbZfponoE3qlfqjy/5T+Wh2g13GiygSwDjeUosaQxHE6NiS05WW04WF6xmx9RoIY7QTBod/+BGTDIzPsPZw4Dg49ebHjRR43PnwHZKuvTp8AmGWtJkMTGsQ5Jx65n80tBlBpVYiN256WmU2QZKL5xdKae4++igLcXIgSJztXmzdWYpGH+npfiEtayZj8vUMH0Nh4M/Rdt7ayebXtgKtM7a98ucaYf+sgprira89BbMAYqB37rl8LU+s3QvG9rRikjBKeMN0zLm1d+wg15lkYqRP0mEByOyqTpkQm9XxEADc0uE7XJnJmQTse8l3JWqCLzm/otl+qNK/NE//WW9D5+7+tOEJ05Kj5fMNNSjTUnp9r3LrtQ3AM836qL4ImTaUf8Umuz1FI53AOan7GS5/BOJcgoJA6PajNmTILSRjVLi/EvAAkQ6Q36BOOJsdiqPXB60S65XIXomP71pJQKmoaH/pwTPUqFSfPzzXmuRcuhAIbICT0XOeQxLLqHKVrg6FcK4RyTEfvUgQ45LgoTFz/45e0Hc6bCsKUa3yh7PkRUuguab+x6gqAtNtDHzp0kKHOjSXs/zdu70GI6UVAqL3fe5++4V58ARMhyZkjc2bW6OIFCQnjZR7gOCUsU+HSB1Tr+577c6kvqJa0K1RQnkDa7+Acg8uWJx/X3uLx8VIzOXaOeu8rjs94bPEbUxhpMjRXqkjtnCEVKpNIWmpRYKGGAEoa0Q9IF0gmkIRITcCFZNETqiUykMXPICgCOzQ4KwIilO2FK2bcn6Hxecb8DeerXgcBFKp2eVA0SMJWLY3V73sQp6ECoKyKFiepgQHaVOSjjmtL3HG1GCRFpnwC8YNFipMpfd37i3PC4/CQOiiY1cuf6ZErZupRgigpMlVzhkaOvA4Q1xNI+wbKyjB3tVpAFqbZDKLWVTBxkbS2qe/ihJB9qhQecQGistkIewwcV1yR2D684yNpkkpriuJcfEGFjt6I4HvoiQ0RmcpUCHA+9vtBwkapcemt8QJnmfiArhiB1AJEkAqrircV0WZoCBq33hYp+D8xH5lgxAKUKROXR6GKBqzoMjpoN7MUkNIlFqBOEGr31PmAOEJimn1AIgRtnMSlan6Vpds70VnYYizX7LP8pUmoskAfHR3Ur9em0aP4ANJiCHVzi+PS+emqPTc4JfbHRIj47lAtEBcz068YeFfHjnqEuDuQbJAy+iwKJkDN+VXOcKY7iQKJCAjqqGsmLGWBLk4acX7UdChKQXjoIL8ddTYzJN0LhndjHChlwaJLf6BBDBA9XA8YbXpEOmbjR8dWL7MwfnTLTVPFf73ZgjPYgsZ+eruJndpFf/opaGG3B3od5dneEGnTr+yEsS2PQgeX5jhxVa2fyZb//Mrp5c9v65d+gLFO/edpd057YxqJPb2lX/oKtKhd/V4zTxt+s7VuPSz98uNMC9HEtMH8fPBuDFuxrg12C4Kw7B6q85ljh7beQXH137kJF0I+AOd6IxqIFqKJqtH56I9jlwoAw9q0WnqyzxxrUsmJj1m0CN4vm8HFGEmNUgScnh+sBqfoXYkCKAApzDRVjD/Yi95UnYfH69SMKThVPgewn2Mjn1TwMgY1QqgzreuACf3CdcUfNnenP4m4zQAAA0lJREFU6YnYV5hQ/jV2GkjDBtRCfODG55m5mvdmI1qoIdNk0uUHW730K/8Vf8gz3RIENPtO+BDz2xADZW2sbQSxI7w0sec1WA7vj21iz25OzlywsjTPlXKd/l5+iGe6KjjGdc56FRmgdwwhjakBRp9+Gkb/4VtwrjeiYfTpb/B5Sd8s9M8YI8/0qNQCAQ4GXGoK/PO1Gnhq4zi52BnAnt/7XTj8wn/AyDVr5FdjtBkDZ3XTOE8t+BO7d/O65IBVzSuNfg7649g0+wjFB2kkJnD8xF7T6uefoKQ9COjpSZQNUjzmKIQ+PBl96kk4BFDF4HnefzfG8l9SgDvETZDWWEzbQbR72vdz5BW9+f5SAJ32qV0G19hdsqzEUg6V1uUQSmdCttPUFNmFUHaKQwSAUbkn497jO7lfNqSVePotAGeAYKoKcA7649H3NWH66OGX0s/B/ptvOjq9/415g3uMo1yYaNyVQjC8Z5GB016QoowUkam0tE0z79ZadfnYqq3bFtN5+Vthu2DBCxhPN0n7GxQyBmrFjV6P7Tq6nwVZhAjJ/fnefzfuS49C1ip52T2B+Gnfp/yl0fd8yXc86R49+kS+eEksuCpvCZXWKy+rc8XJtWSWRdP0CHI8C/cjc6nWK7rnpj9fsgTc1ORTqUzKbd/NG3ec2rdv/dl2Yudy3H/l6pdWb/3ehhkIoK09evgzjRUrJO3tkejPwrhxwYXk/R9Mec7SwV+Pjb25+eqrclyK/kU3OSmwSvb3+zic5n5+3vmQLxh58KodLz0OyTar09x7662fbb89+pnO/xyCmms38FM57kNUZwODD655+eWHoGebM2psv3Tl7f1Llj7cOfrj9d0jR+q9vp+GjX5DdN550Lrggp3d9qn7r9++8zuzPTZv2Hxl5co78hUrPhHa7Vu6x48t8qemwLenwdP/L5gRts7d0WJ6a/tbYDHLs4ODYzbPv+sxsq19881/Ph1/Z5I3lNu2Sy65trV8+Xr85ioMgRehe13mpqZG8HwYszD6uS1SYOVnv/TrU6hXBibU87qgR1M3WXorpBfovqHf6GEXB9f0Cmrg0G5brZOYDY3jQ6OYiR5Eh0bp7a4Pbt36Mpzh9hMJ4Gdx+18AAAD//2yLvwEAAAAGSURBVAMAVc0/67zAgCEAAAAASUVORK5CYII=
// @homepageURL  https://github.com/Schurliiii/lss-scripts
// @supportURL   https://github.com/Schurliiii/lss-scripts/issues
// @updateURL    https://raw.githubusercontent.com/Schurliiii/lss-scripts/main/lss_verwaltung/dist/lss-verwaltung.meta.js
// @downloadURL  https://raw.githubusercontent.com/Schurliiii/lss-scripts/main/lss_verwaltung/dist/lss-verwaltung.user.js
// @match        https://www.leitstellenspiel.de/*
// @match        https://leitstellenspiel.de/*
// @match        https://polizei.leitstellenspiel.de/*
// @connect      api.lss-manager.de
// @require      https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js
// @resource     lssfoLeafletCss https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css
// @resource     lssfoAustriaDistricts https://gis.geosphere.at/maps/rest/services/grenzen/admin_grenzen_oesterreich/MapServer/1/query?where=1%3D1&outFields=g_id%2Cg_name&returnGeometry=true&outSR=4326&geometryPrecision=6&maxAllowableOffset=0.00005&f=geojson
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_getResourceText
// @grant        unsafeWindow
// @run-at       document-idle
// ==/UserScript==

(() => {
  const style = document.createElement("style");
  style.id = "lssfo-userscript-style";
  const leafletCss = typeof GM_getResourceText === "function" ? GM_getResourceText("lssfoLeafletCss") : "";
  style.textContent = leafletCss + "\n" + ":root.lssfo-open { overflow: hidden !important; }\n@property --lssfo-p { syntax: \"<number>\"; inherits: true; initial-value: 1; }\n\n/* Navigation */\n#lssfo-launcher-host { display:block; float:left; height:50px; margin:0; padding:0; list-style:none; }\n#lssfo-launcher-host #lssfo-launcher { position:static; display:flex; width:46px; height:50px; align-items:center; justify-content:center; margin:0; padding:0; border:0; border-radius:0; color:#fff; background:transparent; box-shadow:none; cursor:pointer; transition:background .2s; }\n#lssfo-launcher-host #lssfo-launcher:hover,\n#lssfo-launcher-host #lssfo-launcher:focus-visible { color:#fff; background:rgba(255,255,255,.14); outline:0; }\n#lssfo-launcher-host #lssfo-launcher > span:last-child { display:none; }\n#lssfo-launcher-host #lssfo-launcher .lssfo-icon { width:18px; height:18px; }\n#lssfo-launcher-host #lssfo-launcher .lssfo-launcher-glyph, #lssfo-launcher .lssfo-launcher-glyph { width:17px; height:17px; filter:drop-shadow(0 1px 1px rgba(0,0,0,.25)); }\nbody > #lssfo-launcher { position:fixed; top:58px; right:12px; z-index:99997; display:flex; align-items:center; gap:7px; padding:9px 14px; border:.5px solid rgba(255,255,255,.6); border-radius:20px; color:#1d1d1f; background:rgba(255,255,255,.72); box-shadow:0 8px 24px rgba(0,0,0,.16); font:600 13px/1.2 -apple-system,BlinkMacSystemFont,\"SF Pro Text\",\"Inter\",\"Segoe UI\",system-ui,sans-serif; cursor:pointer; -webkit-backdrop-filter:blur(24px) saturate(180%); backdrop-filter:blur(24px) saturate(180%); }\n\n/* Theme */\n#lssfo-shell, #lssfo-planner {\n  --bg:rgba(242,242,247,.8); --panel:rgba(255,255,255,.82); --soft:rgba(120,120,128,.08); --strong:rgba(120,120,128,.14); --th:rgba(248,248,250,.94); --sheet:rgba(246,246,248,.93);\n  --edge:rgba(255,255,255,.7); --border:rgba(60,60,67,.18); --border-soft:rgba(60,60,67,.1);\n  --text:#1d1d1f; --muted:rgba(60,60,67,.68); --subtle:rgba(60,60,67,.46);\n  --primary:#007aff; --primary-hover:#0066d6; --primary-soft:rgba(0,122,255,.12);\n  --danger:#e5251b; --danger-soft:rgba(255,59,48,.12); --warning:#c26a00; --warning-soft:rgba(255,149,0,.16);\n  --success:#1f8a3b; --success-soft:rgba(52,199,89,.16); --thumb:#fff;\n  --shadow:0 30px 80px rgba(0,0,0,.22),0 2px 8px rgba(0,0,0,.08); --shadow-small:0 4px 14px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.05);\n  --spring:cubic-bezier(.32,.72,0,1); --ease:cubic-bezier(.25,.1,.25,1);\n  --font:-apple-system,BlinkMacSystemFont,\"SF Pro Text\",\"Inter\",\"Segoe UI Variable\",\"Segoe UI\",system-ui,sans-serif;\n  color:var(--text); color-scheme:light; font:14px/1.4 var(--font); -webkit-font-smoothing:antialiased;\n}\n#lssfo-shell[data-theme=\"dark\"], #lssfo-planner[data-theme=\"dark\"] {\n  --bg:rgba(28,28,30,.82); --panel:rgba(44,44,46,.74); --soft:rgba(118,118,128,.12); --strong:rgba(118,118,128,.22); --th:rgba(40,40,42,.95); --sheet:rgba(30,30,32,.9);\n  --edge:rgba(255,255,255,.1); --border:rgba(255,255,255,.12); --border-soft:rgba(255,255,255,.07);\n  --text:#f5f5f7; --muted:rgba(235,235,245,.64); --subtle:rgba(235,235,245,.42);\n  --primary:#0a84ff; --primary-hover:#409cff; --primary-soft:rgba(10,132,255,.2);\n  --danger:#ff6961; --danger-soft:rgba(255,69,58,.2); --warning:#ffb340; --warning-soft:rgba(255,159,10,.18);\n  --success:#4cd964; --success-soft:rgba(48,209,88,.18); --thumb:rgba(99,99,102,.95);\n  --shadow:0 30px 80px rgba(0,0,0,.55),0 2px 8px rgba(0,0,0,.3); --shadow-small:0 4px 14px rgba(0,0,0,.25);\n  color-scheme:dark;\n}\n#lssfo-shell { position:fixed; inset:0; z-index:99998; animation:lssfo-in .55s var(--spring) both; }\n#lssfo-shell.is-closing { animation:lssfo-out .26s var(--ease) forwards; pointer-events:none; }\n@keyframes lssfo-in { from { --lssfo-p:0; } to { --lssfo-p:1; } }\n@keyframes lssfo-out { from { --lssfo-p:1; } to { --lssfo-p:0; } }\n#lssfo-shell[hidden], #lssfo-shell [hidden], #lssfo-planner [hidden] { display:none !important; }\n#lssfo-shell, #lssfo-shell *, #lssfo-planner, #lssfo-planner * { box-sizing:border-box; }\n#lssfo-shell button, #lssfo-shell input, #lssfo-shell select, #lssfo-planner button, #lssfo-planner input, #lssfo-planner select { font:inherit; letter-spacing:normal; }\n#lssfo-shell a, #lssfo-planner a { color:var(--primary); }\n#lssfo-shell h1, #lssfo-shell h2, #lssfo-shell h3, #lssfo-planner h2, #lssfo-planner h3 { font-family:var(--font); }\n.lssfo-icon { display:block; width:17px; height:17px; flex:0 0 auto; }\n.lssfo-backdrop { position:absolute; inset:0; background:rgba(0,0,0,.3); opacity:var(--lssfo-p); -webkit-backdrop-filter:blur(6px); backdrop-filter:blur(6px); }\n\n/* Main window */\n.lssfo-panel { position:absolute; inset:16px; display:flex; min-width:0; flex-direction:column; overflow:hidden; border:.5px solid var(--edge); border-radius:26px; background:var(--bg); box-shadow:var(--shadow); -webkit-backdrop-filter:blur(40px) saturate(180%); backdrop-filter:blur(40px) saturate(180%); opacity:var(--lssfo-p); transform:translateY(calc((1 - var(--lssfo-p)) * 26px)) scale(calc(.965 + .035 * var(--lssfo-p))); }\n.lssfo-header { display:flex; align-items:center; justify-content:space-between; gap:20px; padding:18px 20px 10px 22px; }\n.lssfo-header-copy { display:flex; min-width:0; align-items:center; gap:13px; }\n.lssfo-brand-mark { display:grid; width:42px; height:42px; flex:0 0 auto; place-items:center; border-radius:12px; color:#fff; background:linear-gradient(160deg,#ff6259,#e0241a); box-shadow:0 6px 16px rgba(229,37,27,.32); }\n.lssfo-brand-mark .lssfo-icon { width:20px; height:20px; filter:drop-shadow(0 1px 1px rgba(0,0,0,.2)); }\n.lssfo-header h1 { margin:0; color:var(--text); font-size:24px; font-weight:700; letter-spacing:-.022em; line-height:1.15; }\n.lssfo-header p { margin:2px 0 0; color:var(--muted); font-size:13px; }\n.lssfo-header-actions { display:flex; flex:0 0 auto; align-items:center; gap:8px; }\n\n/* Controls */\n.lssfo-btn,.lssfo-icon-btn { display:inline-flex; min-height:34px; align-items:center; justify-content:center; gap:6px; padding:0 14px; border:0; border-radius:10px; color:var(--primary); background:var(--primary-soft); box-shadow:none; font-size:13px; font-weight:600; line-height:1; text-decoration:none !important; white-space:nowrap; cursor:pointer; transition:transform .25s var(--spring),background .2s,filter .2s,opacity .2s; }\n.lssfo-btn:hover,.lssfo-btn:focus-visible { background:color-mix(in srgb,var(--primary) 20%,transparent); outline:0; }\n.lssfo-btn:active,.lssfo-icon-btn:active { transform:scale(.95); }\n.lssfo-btn:disabled { opacity:.42; cursor:default; transform:none; }\n.lssfo-btn-primary { color:#fff !important; background:var(--primary); box-shadow:0 4px 12px color-mix(in srgb,var(--primary) 30%,transparent); }\n.lssfo-btn-primary:hover,.lssfo-btn-primary:focus-visible { background:var(--primary); filter:brightness(1.08); }\n.lssfo-btn-danger { color:var(--danger); background:var(--danger-soft); }\n.lssfo-btn-danger:hover { background:color-mix(in srgb,var(--danger) 20%,transparent); }\n.lssfo-btn-success { color:#fff !important; background:#34c759; }\n.lssfo-btn-small { min-height:28px; padding:0 11px; border-radius:14px; font-size:12px; }\n.lssfo-icon-btn { width:34px; height:34px; padding:0; border-radius:50%; color:var(--muted); background:var(--strong); }\n.lssfo-icon-btn:hover,.lssfo-icon-btn:focus-visible { color:var(--text); background:color-mix(in srgb,var(--text) 14%,transparent); outline:0; }\n.lssfo-icon-btn .lssfo-icon { width:15px; height:15px; }\n.lssfo-theme-control { display:flex; min-height:34px; align-items:center; gap:4px; padding:0 4px 0 11px; border-radius:10px; color:var(--muted); background:var(--strong); }\n.lssfo-theme-control .lssfo-icon { width:15px; height:15px; }\n.lssfo-theme-control select { width:auto; padding:6px 4px; border:0; outline:0; color:var(--text); background:transparent; font-size:13px; font-weight:500; cursor:pointer; }\n.lssfo-status { display:flex; align-items:center; gap:8px; margin:4px 20px 6px; padding:10px 14px; border-radius:12px; color:var(--primary); background:var(--primary-soft); font-size:13px; font-weight:500; animation:lssfo-drop .4s var(--spring) both; }\n.lssfo-status.error { color:var(--danger); background:var(--danger-soft); }\n.lssfo-status.warn { color:var(--warning); background:var(--warning-soft); }\n.lssfo-status.success { color:var(--success); background:var(--success-soft); }\n@keyframes lssfo-drop { from { opacity:0; transform:translateY(-6px); } }\n.lssfo-spinner { display:inline-block; width:14px; height:14px; flex:0 0 auto; border:2px solid currentColor; border-right-color:transparent; border-radius:50%; vertical-align:-2px; animation:lssfo-spin .7s linear infinite; }\n@keyframes lssfo-spin { to { transform:rotate(360deg); } }\n\n/* Summary and tabs */\n.lssfo-kpis { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:10px; padding:8px 20px 12px; }\n.lssfo-kpi { display:grid; min-width:0; gap:2px; padding:13px 15px; border-radius:16px; background:var(--panel); box-shadow:var(--shadow-small); transition:transform .3s var(--spring); }\n.lssfo-kpi:hover { transform:translateY(-2px); }\n.lssfo-kpi-label { display:flex; align-items:center; gap:8px; }\n.lssfo-kpi-label i { display:grid; width:26px; height:26px; place-items:center; border-radius:8px; color:#fff; background:var(--primary); }\n.lssfo-kpi-label .lssfo-icon { width:15px; height:15px; }\n.lssfo-kpi-label span { overflow:hidden; color:var(--muted); font-size:13px; font-weight:500; text-overflow:ellipsis; white-space:nowrap; }\n.lssfo-kpi strong { overflow:hidden; margin-top:4px; color:var(--text); font-size:28px; font-weight:700; letter-spacing:-.025em; line-height:1.05; text-overflow:ellipsis; font-variant-numeric:tabular-nums; }\n.lssfo-kpi small { overflow:hidden; color:var(--subtle); font-size:12px; text-overflow:ellipsis; white-space:nowrap; }\n.lssfo-kpi.danger .lssfo-kpi-label i { background:#ff3b30; }\n.lssfo-kpi.danger strong { color:var(--danger); }\n.lssfo-tabs { position:relative; display:flex; flex:0 0 auto; gap:2px; margin:0 20px; padding:3px; overflow-x:auto; overflow-y:hidden; border-radius:12px; background:var(--strong); scrollbar-width:none; }\n.lssfo-tabs::-webkit-scrollbar { display:none; }\n.lssfo-tab-indicator { position:absolute; top:3px; bottom:3px; left:0; z-index:0; width:0; border-radius:9px; background:var(--thumb); box-shadow:0 3px 8px rgba(0,0,0,.12),0 0 0 .5px rgba(0,0,0,.04); transition:transform .5s var(--spring),width .5s var(--spring); pointer-events:none; }\n.lssfo-tabs button { position:relative; z-index:1; display:flex; min-height:32px; flex:0 0 auto; align-items:center; gap:6px; padding:0 12px; border:0; border-radius:9px; color:var(--muted); background:transparent; font-size:13px; font-weight:500; cursor:pointer; transition:color .2s; }\n.lssfo-tabs button:hover { color:var(--text); }\n.lssfo-tabs button.active { color:var(--text); font-weight:600; }\n.lssfo-tab-symbol .lssfo-icon { width:15px; height:15px; }\n.lssfo-tabs button.active .lssfo-tab-symbol { color:var(--primary); }\n.lssfo-tabs b { min-width:20px; padding:1px 6px; border-radius:9px; color:var(--muted); background:var(--strong); font-size:11px; font-weight:600; text-align:center; font-variant-numeric:tabular-nums; }\n.lssfo-tabs button.active b { color:#fff; background:var(--primary); }\n.lssfo-toolbar { display:flex; flex:0 0 auto; align-items:center; gap:10px; margin:12px 20px 10px; }\n.lssfo-search { display:flex; min-width:180px; min-height:36px; flex:1 1 320px; align-items:center; gap:7px; padding:0 12px; border-radius:11px; color:var(--subtle); background:var(--strong); transition:box-shadow .25s var(--ease),background .25s; }\n.lssfo-search:focus-within { background:var(--panel); box-shadow:0 0 0 3.5px color-mix(in srgb,var(--primary) 35%,transparent); }\n.lssfo-search .lssfo-icon { width:16px; height:16px; }\n.lssfo-search input { width:100%; padding:8px 0; border:0; outline:0; color:var(--text); background:transparent; font-size:14px; }\n.lssfo-search input::placeholder { color:var(--subtle); }\n.lssfo-check,.lssfo-select { display:flex; align-items:center; gap:8px; color:var(--muted); font-size:13px; font-weight:500; white-space:nowrap; }\n.lssfo-check input,.lssfo-district-toggle input { position:relative; width:38px; height:23px; flex:0 0 auto; margin:0; border-radius:12px; background:var(--strong); appearance:none; -webkit-appearance:none; cursor:pointer; transition:background .3s var(--ease); }\n.lssfo-check input::after,.lssfo-district-toggle input::after { content:\"\"; position:absolute; top:2px; left:2px; width:19px; height:19px; border-radius:50%; background:#fff; box-shadow:0 2px 4px rgba(0,0,0,.22); transition:transform .4s var(--spring); }\n.lssfo-check input:checked,.lssfo-district-toggle input:checked { background:#34c759; }\n.lssfo-check input:checked::after,.lssfo-district-toggle input:checked::after { transform:translateX(15px); }\n.lssfo-district-toggle input:disabled { opacity:.4; cursor:default; }\n.lssfo-select select,.lssfo-extension-controls select,.lssfo-map-filters select,.lssfo-course-controls select,.lssfo-edit-grid input,.lssfo-edit-grid select,.lssfo-manager-search input,.lssfo-build-form input,.lssfo-build-form select { height:36px; padding:6px 10px; border:0; border-radius:10px; outline:0; color:var(--text); background:var(--strong); font-size:14px; font-weight:400; transition:box-shadow .2s,background .2s; }\n#lssfo-shell select option,#lssfo-shell select optgroup,#lssfo-planner select option { color:#1d1d1f !important; background:#fff !important; }\n#lssfo-shell[data-theme=\"dark\"] select option,#lssfo-shell[data-theme=\"dark\"] select optgroup,#lssfo-planner[data-theme=\"dark\"] select option { color:#f5f5f7 !important; background:#2c2c2e !important; }\n.lssfo-select select:focus,.lssfo-extension-controls select:focus,.lssfo-map-filters select:focus,.lssfo-course-controls select:focus,.lssfo-edit-grid input:focus,.lssfo-edit-grid select:focus,.lssfo-manager-search input:focus,.lssfo-build-form input:focus,.lssfo-build-form select:focus { background:var(--panel); box-shadow:0 0 0 3.5px color-mix(in srgb,var(--primary) 35%,transparent); }\n.lssfo-content { flex:1; min-width:0; min-height:0; padding:0 20px 16px; overflow:auto; scrollbar-width:thin; scrollbar-color:var(--strong) transparent; }\n.lssfo-content.lssfo-enter > * { animation:lssfo-rise .45s var(--spring) both; }\n.lssfo-content.lssfo-enter > *:nth-child(2) { animation-delay:.03s; }\n.lssfo-content.lssfo-enter > *:nth-child(3) { animation-delay:.06s; }\n.lssfo-content.lssfo-enter > .lssfo-map-layout { animation-name:lssfo-fade; }\n@keyframes lssfo-rise { from { opacity:0; transform:translateY(10px); } }\n@keyframes lssfo-fade { from { opacity:0; } }\n.lssfo-footer { display:flex; flex:0 0 auto; align-items:center; justify-content:space-between; gap:15px; padding:10px 22px 14px; border-top:.5px solid var(--border-soft); color:var(--subtle); font-size:12px; }\n\n/* Tables */\n.lssfo-table-meta { margin:4px 4px 8px; color:var(--muted); font-size:12px; }\n.lssfo-table-more { display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:8px; margin:12px 0 4px; color:var(--muted); font-size:13px; }\n.lssfo-table-more span { margin-right:6px; }\n.lssfo-table-wrap { width:max-content; min-width:100%; overflow:visible; border-radius:16px; background:var(--panel); box-shadow:var(--shadow-small); }\n.lssfo-table-wrap table { width:100%; margin:0; border-collapse:separate; border-spacing:0; color:var(--text); font-size:13px; }\n#lssfo-shell .lssfo-table-wrap th { position:sticky; top:0; z-index:6; padding:11px 14px; border-bottom:.5px solid var(--border); color:var(--muted); background:var(--th); font-size:12px; font-weight:600; text-align:left; -webkit-backdrop-filter:blur(20px); backdrop-filter:blur(20px); }\n.lssfo-table-wrap th:first-child { border-top-left-radius:16px; }\n.lssfo-table-wrap th:last-child { border-top-right-radius:16px; }\n/* Mit #lssfo-shell davor, damit Tabellenstile der Spielseite (z. B. im LSS-Dunkelmodus) Text und Hintergrund nicht überschreiben. */\n#lssfo-shell .lssfo-table-wrap td { height:46px; padding:9px 14px; border-top:.5px solid var(--border-soft); color:var(--text); vertical-align:middle; background:transparent; transition:background .15s; }\n#lssfo-shell .lssfo-table-wrap tbody tr:first-child td { border-top:0; }\n#lssfo-shell .lssfo-table-wrap tbody tr:hover td { background:var(--soft); }\n.lssfo-table-wrap a { color:var(--primary); font-weight:500; text-decoration:none; }\n.lssfo-table-wrap a:hover { text-decoration:underline; }\n.lssfo-sort { display:inline-flex; width:100%; align-items:center; justify-content:space-between; gap:7px; padding:0; border:0; color:inherit; background:transparent; font:inherit; text-align:left; cursor:pointer; }\n.lssfo-sort:hover,.lssfo-sort.active { color:var(--primary); }\n.lssfo-sort:focus-visible { outline:2px solid var(--primary); outline-offset:3px; border-radius:4px; }\n.lssfo-sort-icon { display:grid; width:16px; height:16px; flex:0 0 auto; place-items:center; border-radius:5px; color:var(--subtle); transition:background .2s; }\n.lssfo-sort-icon .lssfo-icon { width:13px; height:13px; }\n.lssfo-sort.active .lssfo-sort-icon { color:var(--primary); background:var(--primary-soft); }\n\n/* Common content */\n.lssfo-badge { display:inline-flex; min-width:24px; align-items:center; justify-content:center; margin:1px 2px; padding:3px 8px; border-radius:10px; font-size:12px; font-weight:600; line-height:1.25; white-space:nowrap; }\n.lssfo-badge.ok { color:var(--success); background:var(--success-soft); }\n.lssfo-badge.warn { color:var(--warning); background:var(--warning-soft); }\n.lssfo-badge.danger { color:var(--danger); background:var(--danger-soft); }\n.lssfo-badge.neutral { color:var(--muted); background:var(--strong); }\n.lssfo-muted,.lssfo-not-applicable { color:var(--subtle); }\n.lssfo-training-cell { display:inline-block; min-width:150px; }\n.lssfo-status-action { display:inline-flex; align-items:center; gap:6px; }\n.lssfo-plan-complete { color:var(--success); }\n.lssfo-empty { padding:40px 20px; border-radius:16px; color:var(--muted); background:var(--panel); box-shadow:var(--shadow-small); font-size:14px; text-align:center; }\n.lssfo-empty-small { padding:20px 14px; box-shadow:none; background:transparent; }\n.lssfo-callout { display:flex; align-items:center; gap:10px; margin-bottom:12px; padding:12px 15px; border-radius:14px; color:var(--muted); background:var(--primary-soft); font-size:13px; }\n.lssfo-callout strong { color:var(--text); white-space:nowrap; }\n.lssfo-content-actions { display:flex; align-items:center; justify-content:space-between; gap:15px; margin-bottom:12px; padding:14px 16px; border-radius:16px; background:var(--panel); box-shadow:var(--shadow-small); }\n.lssfo-content-actions > div:first-child { display:grid; gap:2px; }\n.lssfo-content-actions strong { color:var(--text); font-size:15px; font-weight:600; }\n.lssfo-content-actions span { color:var(--muted); font-size:13px; }\n.lssfo-section-heading { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:10px; }\n.lssfo-section-heading h3 { margin:0; color:var(--text); font-size:17px; font-weight:700; letter-spacing:-.01em; }\n.lssfo-section-heading p { margin:2px 0 0; color:var(--muted); font-size:13px; }\n\n/* Dashboard */\n.lssfo-dashboard-grid { display:grid; grid-template-columns:repeat(6,minmax(130px,1fr)); gap:10px; margin-bottom:12px; }\n.lssfo-dashboard-card { display:grid; min-width:0; grid-template:auto 1fr/32px minmax(0,1fr); gap:3px 10px; padding:14px; border:0; border-radius:16px; color:var(--text); background:var(--panel); box-shadow:var(--shadow-small); text-align:left; cursor:pointer; transition:transform .35s var(--spring),box-shadow .3s; }\n.lssfo-dashboard-card:hover,.lssfo-dashboard-card:focus-visible { transform:translateY(-3px); box-shadow:0 12px 28px rgba(0,0,0,.12); outline:0; }\n.lssfo-dashboard-card:active { transform:scale(.97); }\n.lssfo-dashboard-card i { display:grid; width:30px; height:30px; grid-row:1/3; place-items:center; border-radius:9px; color:#fff; background:var(--primary); }\n.lssfo-dashboard-card:nth-child(2) i { background:#ff9500; } .lssfo-dashboard-card:nth-child(3) i { background:#af52de; } .lssfo-dashboard-card:nth-child(4) i { background:#34c759; } .lssfo-dashboard-card:nth-child(5) i { background:#5ac8fa; } .lssfo-dashboard-card:nth-child(6) i { background:#ff2d55; }\n.lssfo-dashboard-card i .lssfo-icon { width:16px; height:16px; }\n.lssfo-dashboard-card span { overflow:hidden; color:var(--muted); font-size:12px; font-weight:500; text-overflow:ellipsis; white-space:nowrap; }\n.lssfo-dashboard-card strong { color:var(--text); font-size:24px; font-weight:700; letter-spacing:-.02em; line-height:1; }\n.lssfo-dashboard-card small { grid-column:2; color:var(--subtle); font-size:12px; }\n.lssfo-dashboard-columns { display:grid; min-height:260px; grid-template-columns:1.15fr .85fr; gap:12px; }\n.lssfo-dashboard-panel { min-width:0; padding:16px 10px 8px; border-radius:18px; background:var(--panel); box-shadow:var(--shadow-small); }\n.lssfo-dashboard-panel > .lssfo-section-heading { padding:0 8px; }\n.lssfo-alert-row,.lssfo-readiness-row { display:flex; width:100%; align-items:center; justify-content:space-between; gap:10px; padding:10px 10px; border:0; border-radius:12px; color:var(--text); background:transparent; text-align:left; cursor:pointer; transition:background .2s; }\n.lssfo-alert-row + .lssfo-alert-row,.lssfo-readiness-row + .lssfo-readiness-row { box-shadow:0 -.5px 0 var(--border-soft); }\n.lssfo-alert-row:hover,.lssfo-readiness-row:hover { background:var(--soft); }\n.lssfo-alert-row > span,.lssfo-readiness-row > span { display:grid; min-width:0; gap:1px; }\n.lssfo-alert-row strong,.lssfo-readiness-row strong { overflow:hidden; font-size:14px; font-weight:500; text-overflow:ellipsis; white-space:nowrap; }\n.lssfo-alert-row small,.lssfo-readiness-row small { color:var(--muted); font-size:12px; }\n.lssfo-alert-row > .lssfo-icon { width:15px; height:15px; color:var(--subtle); }\n.lssfo-alert-row.priority-4 strong::before { content:\"\"; display:inline-block; width:7px; height:7px; margin-right:7px; border-radius:50%; background:#ff3b30; vertical-align:1px; }\n.lssfo-alert-row.priority-3 strong::before { content:\"\"; display:inline-block; width:7px; height:7px; margin-right:7px; border-radius:50%; background:#ff9500; vertical-align:1px; }\n.lssfo-readiness-row > b,.lssfo-readiness-badge { min-width:50px; padding:4px 9px; border-radius:10px; font-size:12px; font-weight:700; text-align:center; font-variant-numeric:tabular-nums; }\n.lssfo-readiness-row > b.ok,.lssfo-readiness-badge.ok { color:var(--success); background:var(--success-soft); }\n.lssfo-readiness-row > b.warn,.lssfo-readiness-badge.warn { color:var(--warning); background:var(--warning-soft); }\n.lssfo-readiness-row > b.danger,.lssfo-readiness-badge.danger { color:var(--danger); background:var(--danger-soft); }\n.lssfo-readiness-row > b.neutral,.lssfo-readiness-badge.neutral { color:var(--muted); background:var(--strong); }\n\n/* Specialized panels */\n.lssfo-extension-actions { align-items:flex-end; }\n.lssfo-extension-controls { display:flex; flex:0 0 auto; align-items:flex-end; gap:10px; }\n.lssfo-extension-controls label,.lssfo-map-filters > label:not(.lssfo-district-toggle),.lssfo-course-controls label { display:grid; gap:5px; color:var(--muted); font-size:12px; font-weight:500; }\n.lssfo-extension-controls select { min-width:160px; }\n.lssfo-extension-controls label:last-child select { min-width:105px; }\n.lssfo-limit-note { margin-bottom:10px; }\n.lssfo-utilization-summary { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; margin-bottom:12px; }\n.lssfo-utilization-summary article { display:grid; gap:3px; padding:14px 16px; border-radius:16px; background:var(--panel); box-shadow:var(--shadow-small); }\n.lssfo-utilization-summary span { color:var(--muted); font-size:12px; font-weight:500; }\n.lssfo-utilization-summary strong { overflow:hidden; color:var(--text); font-size:17px; font-weight:700; text-overflow:ellipsis; white-space:nowrap; }\n.lssfo-utilization-summary small { color:var(--subtle); font-size:12px; }\n.lssfo-personnel-planner { margin-bottom:12px; padding:16px; border-radius:18px; background:var(--panel); box-shadow:var(--shadow-small); }\n.lssfo-personnel-scan-note { margin-bottom:8px; padding:9px 12px; border-radius:10px; color:var(--success); background:var(--success-soft); font-size:13px; }\n.lssfo-transfer-card { display:grid; grid-template-columns:30px minmax(0,1fr) auto; align-items:center; gap:11px; padding:10px 4px; border-top:.5px solid var(--border-soft); }\n.lssfo-transfer-card > span { display:grid; width:30px; height:30px; place-items:center; border-radius:9px; color:#fff; background:#5856d6; }\n.lssfo-transfer-card > span .lssfo-icon { width:15px; height:15px; }\n.lssfo-transfer-card > div { display:grid; min-width:0; gap:1px; }\n.lssfo-transfer-card strong { overflow:hidden; color:var(--text); font-size:14px; font-weight:500; text-overflow:ellipsis; white-space:nowrap; }\n.lssfo-transfer-card small { color:var(--muted); font-size:12px; }\n\n/* Map */\n.lssfo-map-filters { display:flex; flex-wrap:wrap; align-items:flex-end; gap:10px 12px; margin-bottom:12px; padding:14px; border-radius:16px; background:var(--panel); box-shadow:var(--shadow-small); }\n.lssfo-map-filters > label:not(.lssfo-district-toggle) { min-width:150px; flex:1 1 150px; }\n.lssfo-map-filters select { width:100%; }\n.lssfo-district-toggle { display:flex; min-height:36px; align-items:center; gap:8px; color:var(--muted); font-size:13px; font-weight:500; white-space:nowrap; }\n.lssfo-map-filters > span { flex:1 0 100%; color:var(--subtle); font-size:11px; text-align:right; }\n.lssfo-map-layout { display:grid; height:min(700px,calc(100vh - 360px)); min-height:380px; grid-template-columns:minmax(230px,300px) minmax(0,1fr); overflow:hidden; border-radius:18px; background:var(--panel); box-shadow:var(--shadow-small); }\n.lssfo-map-list { min-height:0; overflow-y:auto; border-right:.5px solid var(--border); }\n.lssfo-map-list-head { position:sticky; top:0; z-index:2; display:grid; gap:2px; padding:14px; border-bottom:.5px solid var(--border); background:var(--th); -webkit-backdrop-filter:blur(20px); backdrop-filter:blur(20px); }\n.lssfo-map-list-head strong { color:var(--text); font-size:15px; font-weight:700; }\n.lssfo-map-list-head span { color:var(--muted); font-size:12px; }\n.lssfo-map-list-item { display:flex; width:100%; align-items:center; justify-content:space-between; gap:8px; padding:10px 14px; border:0; border-bottom:.5px solid var(--border-soft); color:var(--text); background:transparent; text-align:left; cursor:pointer; transition:background .15s; }\n.lssfo-map-list-item:hover { background:var(--soft); }\n.lssfo-map-list-item.is-inactive { opacity:.55; }\n.lssfo-map-list-item > span { display:grid; min-width:0; gap:1px; }\n.lssfo-map-list-item strong,.lssfo-map-list-item small { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }\n.lssfo-map-list-item strong { font-size:14px; font-weight:500; }\n.lssfo-map-list-item small { color:var(--muted); font-size:12px; }\n.lssfo-map-list-item b { flex:0 0 auto; padding:2px 8px; border-radius:10px; color:var(--primary); background:var(--primary-soft); font-size:12px; font-weight:600; }\n.lssfo-map-stage { position:relative; min-width:0; min-height:0; background:#e9e6df; }\n#lssfo-map-canvas { width:100%; height:100%; background:#e9e6df; }\n.lssfo-map-legend { position:absolute; top:12px; right:12px; z-index:500; display:flex; gap:10px; padding:7px 12px; border:.5px solid var(--edge); border-radius:14px; color:var(--text); background:var(--bg); box-shadow:var(--shadow-small); font-size:12px; -webkit-backdrop-filter:blur(20px) saturate(180%); backdrop-filter:blur(20px) saturate(180%); }\n.lssfo-map-legend span { display:flex; align-items:center; gap:5px; }\n.lssfo-map-legend i { width:8px; height:8px; border-radius:50%; }\n.lssfo-map-legend i.ok { background:#34c759; } .lssfo-map-legend i.danger { background:#ff3b30; } .lssfo-map-legend i.inactive { background:#8e8e93; }\n#lssfo-shell[data-theme=\"dark\"] .leaflet-tile-pane,#lssfo-planner[data-theme=\"dark\"] .leaflet-tile-pane { filter:brightness(.72) contrast(1.07) saturate(.75); }\n#lssfo-shell[data-theme=\"dark\"] .lssfo-map-stage,#lssfo-shell[data-theme=\"dark\"] #lssfo-map-canvas { background:#1c1c1e; }\n.leaflet-tooltip.lssfo-district-label { padding:3px 7px; border:0; border-radius:8px; color:#7a4a00; background:rgba(255,244,222,.9); box-shadow:0 2px 6px rgba(0,0,0,.12); font:600 11px/1.2 -apple-system,BlinkMacSystemFont,\"Segoe UI\",system-ui,sans-serif; }\n#lssfo-shell[data-theme=\"dark\"] .leaflet-tooltip.lssfo-district-label { color:#ffd27a; background:rgba(58,46,26,.9); }\n#lssfo-shell .leaflet-popup-content-wrapper,#lssfo-planner .leaflet-popup-content-wrapper { border-radius:18px; color:var(--text); background:var(--th); box-shadow:var(--shadow); -webkit-backdrop-filter:blur(30px); backdrop-filter:blur(30px); }\n#lssfo-shell .leaflet-popup-tip { background:var(--th); }\n#lssfo-shell .leaflet-popup { animation:lssfo-pop .4s var(--spring) both; transform-origin:bottom center; }\n@keyframes lssfo-pop { from { opacity:0; scale:.92; translate:0 6px; } }\n#lssfo-shell .leaflet-control-zoom { overflow:hidden; border:0 !important; border-radius:12px !important; box-shadow:var(--shadow-small) !important; }\n#lssfo-shell .leaflet-control-zoom a { color:var(--text) !important; background:var(--th) !important; border-color:var(--border-soft) !important; }\n.lssfo-map-popup { min-width:280px; color:var(--text); font-family:var(--font); }\n.lssfo-map-popup h3 { margin:0 0 8px; font-size:16px; font-weight:700; }\n.lssfo-map-popup h3 a { text-decoration:none; }\n.lssfo-map-popup-meta { display:flex; flex-wrap:wrap; align-items:center; gap:6px; }\n.lssfo-map-popup p { margin:8px 0; color:var(--muted); font-size:12px; }\n.lssfo-map-popup ul { max-height:220px; margin:0; padding:0; overflow-y:auto; list-style:none; }\n.lssfo-map-popup li { display:flex; align-items:center; justify-content:space-between; gap:8px; margin-top:5px; padding:8px 10px; border-radius:10px; background:var(--soft); }\n.lssfo-map-popup li.has-missing { background:var(--danger-soft); }\n.lssfo-map-popup li.has-missing b { color:var(--danger); }\n.lssfo-map-popup li.is-complete { background:var(--success-soft); }\n.lssfo-map-popup li.is-complete b { color:var(--success); }\n.lssfo-map-vehicle-main { display:grid; gap:1px; }\n.lssfo-map-vehicle-main small { color:var(--muted); font-size:11px; }\n.lssfo-district-chip { padding:3px 8px; border-radius:10px; color:var(--warning); background:var(--warning-soft); font-size:11px; font-weight:600; }\n\n/* Managers and embedded pages */\n.lssfo-manager { position:fixed; inset:0; z-index:100010; animation:lssfo-in .5s var(--spring) both; }\n.lssfo-manager-backdrop { position:absolute; inset:0; background:rgba(0,0,0,.32); opacity:var(--lssfo-p); -webkit-backdrop-filter:blur(8px); backdrop-filter:blur(8px); }\n.lssfo-manager-card,.lssfo-course-card,.lssfo-sheet { position:absolute; inset:24px; display:flex; min-width:0; flex-direction:column; margin:auto; overflow:hidden; border:.5px solid var(--edge); border-radius:24px; color:var(--text); background:var(--sheet); box-shadow:var(--shadow); -webkit-backdrop-filter:blur(40px) saturate(180%); backdrop-filter:blur(40px) saturate(180%); opacity:var(--lssfo-p); transform:translateY(calc((1 - var(--lssfo-p)) * 40px)) scale(calc(.97 + .03 * var(--lssfo-p))); }\n.lssfo-manager-card { width:min(980px,calc(100vw - 48px)); height:fit-content; max-height:calc(100vh - 48px); }\n.lssfo-manager-header { display:flex; flex:0 0 auto; align-items:center; justify-content:space-between; gap:15px; padding:18px 18px 12px 22px; border-bottom:.5px solid var(--border-soft); }\n.lssfo-manager-header span { color:var(--muted); font-size:12px; font-weight:600; letter-spacing:.02em; }\n.lssfo-manager-header h2 { margin:2px 0 0; color:var(--text); font-size:21px; font-weight:700; letter-spacing:-.02em; }\n.lssfo-manager-body { flex:1; min-height:0; padding:16px 18px; overflow-y:auto; }\n.lssfo-manager-body > .lssfo-status { margin:0 0 12px; }\n.lssfo-manager-section { margin-bottom:12px; padding:16px; border-radius:18px; background:var(--panel); box-shadow:var(--shadow-small); }\n.lssfo-edit-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:12px; }\n.lssfo-edit-grid label { display:grid; gap:5px; color:var(--muted); font-size:12px; font-weight:500; }\n.lssfo-edit-grid small { color:var(--subtle); font-size:11px; font-weight:400; }\n.lssfo-edit-actions { display:flex; flex-wrap:wrap; align-items:center; gap:8px; margin-top:10px; }\n.lssfo-building-status-card { display:grid; grid-template-columns:minmax(0,1fr) auto; align-items:center; gap:6px 10px; padding:12px; border-radius:14px; background:var(--soft); }\n.lssfo-building-status-card > span { color:var(--muted); font-size:12px; font-weight:500; }\n.lssfo-building-status-card > small { grid-column:1/-1; color:var(--subtle); font-size:11px; }\n.lssfo-manager-search { display:flex; align-items:center; gap:6px; color:var(--subtle); }\n.lssfo-manager-search input { min-width:230px; }\n.lssfo-personnel-table { max-height:380px; overflow:auto; box-shadow:none; background:var(--soft); }\n.lssfo-station-vehicles { display:grid; gap:6px; }\n.lssfo-station-vehicles article { display:flex; align-items:center; justify-content:space-between; gap:10px; padding:10px 12px; border-radius:12px; background:var(--soft); }\n.lssfo-station-vehicles article.has-missing { box-shadow:inset 3px 0 0 var(--danger); }\n.lssfo-station-vehicles article.is-complete { box-shadow:inset 3px 0 0 #34c759; }\n.lssfo-station-vehicles article > div { display:flex; align-items:center; gap:8px; }\n.lssfo-station-vehicles article > div:first-child { display:grid; gap:1px; }\n.lssfo-station-vehicles a { color:var(--primary); font-weight:600; text-decoration:none; }\n.lssfo-station-vehicles span { color:var(--muted); font-size:12px; }\n.lssfo-extension-chip-list { display:flex; flex-wrap:wrap; gap:6px; }\n.lssfo-extension-chip { padding:4px 10px; border-radius:12px; color:var(--muted); background:var(--strong); font-size:12px; font-weight:500; }\n.lssfo-extension-chip.active { color:var(--success); background:var(--success-soft); }\n.lssfo-extension-chip.inactive { color:var(--danger); background:var(--danger-soft); }\n.lssfo-extension-chip.building { color:var(--warning); background:var(--warning-soft); }\n.lssfo-course-controls { display:flex; flex:0 0 auto; align-items:flex-end; gap:12px; padding:12px 18px; border-bottom:.5px solid var(--border-soft); }\n.lssfo-course-controls label { min-width:260px; flex:1; }\n.lssfo-course-controls p { flex:1 1 420px; margin:0; color:var(--muted); font-size:13px; }\n.lssfo-course-frame-wrap { position:relative; flex:1; min-height:0; padding:12px; }\n.lssfo-course-frame-wrap iframe { width:100%; height:100%; border:0; border-radius:16px; background:#fff; box-shadow:var(--shadow-small); }\n.lssfo-frame-warning { position:absolute; top:24px; left:50%; z-index:3; display:flex; width:min(680px,calc(100% - 48px)); align-items:center; gap:10px; padding:12px 15px; border-radius:14px; color:var(--warning); background:var(--th); box-shadow:var(--shadow); transform:translateX(-50%); font-size:13px; }\n\n/* Wachenplaner-Brücke */\n#lssfo-planner { position:fixed; inset:0; z-index:100020; pointer-events:none; }\n#lssfo-planner > * { pointer-events:auto; }\n.lssfo-sheet { inset:0; width:min(560px,calc(100vw - 24px)); height:fit-content; max-height:calc(100vh - 48px); }\n.lssfo-sheet .lssfo-manager-body { padding:16px 20px 20px; }\n.lssfo-sheet-icon { display:grid; width:44px; height:44px; flex:0 0 auto; place-items:center; border-radius:13px; color:#fff; font-weight:800; font-size:14px; box-shadow:0 6px 16px rgba(0,0,0,.18); }\n.lssfo-sheet-title { display:flex; min-width:0; align-items:center; gap:13px; }\n.lssfo-build-form { display:grid; gap:12px; }\n.lssfo-build-form label { display:grid; gap:5px; color:var(--muted); font-size:12px; font-weight:500; }\n.lssfo-build-form input,.lssfo-build-form select { width:100%; }\n.lssfo-build-row { display:grid; grid-template-columns:1fr 1fr; gap:12px; }\n.lssfo-build-map { height:190px; overflow:hidden; border-radius:16px; background:#e9e6df; box-shadow:var(--shadow-small); }\n.lssfo-build-meta { display:flex; flex-wrap:wrap; gap:6px 14px; color:var(--muted); font-size:12px; }\n.lssfo-build-meta b { color:var(--text); font-weight:600; }\n.lssfo-build-form details { padding:10px 12px; border-radius:12px; background:var(--soft); }\n.lssfo-build-form summary { color:var(--primary); font-size:13px; font-weight:600; cursor:pointer; }\n.lssfo-build-form details[open] summary { margin-bottom:10px; }\n.lssfo-build-form details > div { display:grid; gap:10px; }\n.lssfo-sheet-actions { display:flex; flex-wrap:wrap; justify-content:flex-end; gap:8px; margin-top:4px; }\n.lssfo-sheet-actions .lssfo-btn { min-height:40px; padding:0 18px; border-radius:12px; font-size:14px; }\n.lssfo-sheet-text { margin:0 0 14px; color:var(--muted); font-size:14px; line-height:1.5; }\n.lssfo-success-mark { display:grid; width:64px; height:64px; margin:6px auto 12px; place-items:center; border-radius:50%; color:#fff; background:#34c759; box-shadow:0 10px 28px rgba(52,199,89,.4); animation:lssfo-pop-mark .6s var(--spring) both; }\n.lssfo-success-mark .lssfo-icon { width:32px; height:32px; stroke-width:3; }\n@keyframes lssfo-pop-mark { from { opacity:0; transform:scale(.4); } }\n.lssfo-center { text-align:center; }\n.lssfo-planner-pill { position:fixed; z-index:100030; left:16px; bottom:16px; display:flex; align-items:center; gap:8px; padding:9px 15px; border:.5px solid var(--edge); border-radius:20px; color:var(--text); background:var(--bg); box-shadow:var(--shadow-small); font-size:13px; font-weight:500; -webkit-backdrop-filter:blur(24px) saturate(180%); backdrop-filter:blur(24px) saturate(180%); animation:lssfo-rise .5s var(--spring) both; }\n.lssfo-planner-pill i { width:8px; height:8px; border-radius:50%; background:#34c759; box-shadow:0 0 0 4px rgba(52,199,89,.22); }\n.lssfo-toast { position:fixed; z-index:100040; left:50%; bottom:22px; max-width:min(480px,calc(100vw - 32px)); padding:12px 18px; border:.5px solid var(--edge); border-radius:18px; color:var(--text); background:var(--bg); box-shadow:var(--shadow); font-size:14px; font-weight:500; pointer-events:none !important; opacity:0; transform:translate(-50%,20px) scale(.96); transition:opacity .3s var(--ease),transform .5s var(--spring); -webkit-backdrop-filter:blur(30px) saturate(180%); backdrop-filter:blur(30px) saturate(180%); }\n.lssfo-toast.is-visible { opacity:1; transform:translate(-50%,0) scale(1); }\n\n/* Responsive */\n@media (max-width:1180px) {\n  .lssfo-dashboard-grid { grid-template-columns:repeat(3,minmax(130px,1fr)); }\n  .lssfo-map-layout { height:min(650px,calc(100vh - 380px)); }\n}\n@media (max-width:900px) {\n  .lssfo-header { align-items:flex-start; flex-direction:column; gap:12px; }\n  .lssfo-header-actions { width:100%; justify-content:flex-end; }\n  .lssfo-kpis { grid-template-columns:repeat(2,minmax(0,1fr)); }\n  .lssfo-toolbar { align-items:stretch; flex-wrap:wrap; }\n  .lssfo-search { flex-basis:100%; }\n  .lssfo-dashboard-columns { grid-template-columns:1fr; }\n  .lssfo-map-layout { grid-template-columns:230px minmax(0,1fr); }\n  .lssfo-content-actions { align-items:stretch; flex-direction:column; }\n}\n@media (max-width:680px) {\n  .lssfo-panel { inset:0; border-radius:0; }\n  .lssfo-header { padding:14px 14px 8px; }\n  .lssfo-header h1 { font-size:21px; }\n  .lssfo-brand-mark { width:36px; height:36px; }\n  .lssfo-header-actions { overflow-x:auto; justify-content:flex-start; }\n  .lssfo-popout-btn span,.lssfo-btn[data-action=\"refresh\"] span { display:none; }\n  .lssfo-kpis { gap:8px; padding:6px 12px 10px; }\n  .lssfo-kpi { padding:10px 12px; }\n  .lssfo-kpi strong { font-size:22px; }\n  .lssfo-tabs { margin:0 12px; }\n  .lssfo-toolbar { margin:10px 12px; }\n  .lssfo-content { padding:0 12px 12px; }\n  .lssfo-dashboard-grid { grid-template-columns:repeat(2,minmax(120px,1fr)); }\n  .lssfo-utilization-summary { grid-template-columns:1fr; }\n  .lssfo-extension-controls { align-items:stretch; flex-direction:column; }\n  .lssfo-extension-controls select { width:100%; }\n  .lssfo-map-layout { height:calc(100vh - 380px); min-height:340px; grid-template-columns:1fr; }\n  .lssfo-map-list { display:none; }\n  .lssfo-manager-card,.lssfo-course-card { inset:8px; width:auto; }\n  .lssfo-sheet { width:calc(100vw - 16px); }\n  .lssfo-manager-header { padding:14px; }\n  .lssfo-manager-header h2 { font-size:18px; }\n  .lssfo-edit-grid,.lssfo-build-row { grid-template-columns:1fr; }\n  .lssfo-course-controls { align-items:stretch; flex-direction:column; }\n  .lssfo-course-controls label { min-width:0; }\n  .lssfo-transfer-card { grid-template-columns:30px minmax(0,1fr); }\n  .lssfo-transfer-card .lssfo-btn { grid-column:1/-1; }\n  .lssfo-footer { display:none; }\n}\n/* Effekte: Sparsam – für schwächere Rechner. Keine Glas-Unschärfe (teuer für die\n   Grafik), deckende Flächen statt Transparenz und praktisch keine Animationen. */\n#lssfo-shell.lssfo-lite, #lssfo-planner.lssfo-lite { --bg:#f2f2f7; --panel:#fff; --th:#f8f8fa; --sheet:#f6f6f8; }\n#lssfo-shell.lssfo-lite[data-theme=\"dark\"], #lssfo-planner.lssfo-lite[data-theme=\"dark\"] { --bg:#1c1c1e; --panel:#2c2c2e; --th:#28282a; --sheet:#1e1e20; }\n#lssfo-shell.lssfo-lite *, #lssfo-planner.lssfo-lite * { -webkit-backdrop-filter:none !important; backdrop-filter:none !important; }\n#lssfo-shell.lssfo-lite .lssfo-backdrop, #lssfo-shell.lssfo-lite .lssfo-manager-backdrop, #lssfo-planner.lssfo-lite .lssfo-manager-backdrop { background:rgba(0,0,0,.5); }\n#lssfo-shell.lssfo-lite, #lssfo-shell.lssfo-lite *, #lssfo-planner.lssfo-lite * { animation-duration:.001ms !important; animation-delay:0s !important; transition-duration:.001ms !important; }\n#lssfo-shell.lssfo-lite .lssfo-kpi:hover, #lssfo-shell.lssfo-lite .lssfo-dashboard-card:hover { transform:none; }\n:root.lssfo-standalone #lssfo-launcher { display:none !important; }\n:root.lssfo-standalone .lssfo-panel { inset:0; border-radius:0; }\n@media (prefers-reduced-motion:reduce) {\n  #lssfo-shell,#lssfo-shell *,#lssfo-planner,#lssfo-planner *,#lssfo-launcher { scroll-behavior:auto !important; animation-duration:.001ms !important; animation-delay:0s !important; animation-iteration-count:1 !important; transition:none !important; }\n}\n\n/* Spielseiten (Wache, Personal, Fahrzeug) direkt im Panel. */\nhtml.lssfo-lightbox-front #lightbox_background { z-index:100049 !important; }\nhtml.lssfo-lightbox-front #lightbox_box { z-index:100050 !important; }\n.lssfo-game-view-actions { display:flex; gap:6px; }\n.lssfo-game-view-actions .lssfo-icon-btn { font-size:20px; line-height:1; }\na.lssfo-btn { text-decoration:none; }\n\n/* Fahrzeuge bearbeiten */\n.lssfo-editor-bar { display:flex; flex-wrap:wrap; align-items:flex-end; gap:14px; margin-bottom:12px; padding:14px 16px; border-radius:16px; background:var(--panel); box-shadow:var(--shadow-small); }\n.lssfo-editor-bar label { display:grid; gap:5px; color:var(--muted); font-size:12px; font-weight:500; }\n.lssfo-editor-bar select, .lssfo-editor-bar input { min-width:180px; min-height:34px; padding:0 10px; border:.5px solid var(--border); border-radius:10px; color:var(--text); background:var(--field, var(--th)); font:inherit; font-size:13px; }\n.lssfo-editor-replace { display:flex; flex-wrap:wrap; align-items:flex-end; gap:10px; }\n.lssfo-editor-save { display:flex; align-items:center; gap:10px; margin-left:auto; color:var(--muted); font-size:13px; }\n#lssfo-shell .lssfo-inline-input { width:100%; min-width:120px; min-height:30px; padding:0 8px; border:.5px solid transparent; border-radius:8px; color:var(--text); background:transparent; font:inherit; font-size:13px; }\n#lssfo-shell .lssfo-inline-input:hover { border-color:var(--border); }\n#lssfo-shell .lssfo-inline-input:focus { border-color:var(--primary); background:var(--th); outline:0; }\n#lssfo-shell .lssfo-inline-input.is-changed { border-color:var(--warning); background:var(--warning-soft); }\n.lssfo-course-open { display:flex; flex-wrap:wrap; align-items:center; gap:14px; padding:22px 18px; color:var(--muted); font-size:13px; }\n@media (max-width:760px) { .lssfo-editor-save { margin-left:0; } .lssfo-editor-bar select, .lssfo-editor-bar input { min-width:0; width:100%; } }\n\n/* Fahrzeug umrüsten */\n.lssfo-refit-card { max-width:760px; max-height:min(820px,calc(100% - 48px)); }\n.lssfo-refit-body { flex:1; min-height:0; overflow:auto; padding:16px 18px; }\n.lssfo-refit-preset { display:grid; gap:6px; margin-bottom:14px; color:var(--muted); font-size:12px; font-weight:500; }\n.lssfo-refit-preset select, .lssfo-refit-field input { min-height:36px; padding:0 10px; border:.5px solid var(--border); border-radius:10px; color:var(--text); background:var(--th); font:inherit; font-size:14px; }\n.lssfo-refit-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:12px; }\n.lssfo-refit-field { display:grid; gap:4px; padding:12px 14px; border-radius:14px; background:var(--panel); box-shadow:var(--shadow-small); }\n.lssfo-refit-field strong { font-size:14px; }\n.lssfo-refit-field small { color:var(--muted); font-size:12px; }\n.lssfo-refit-field span { display:flex; align-items:center; gap:10px; margin-top:4px; }\n.lssfo-refit-field input { width:140px; }\n.lssfo-refit-field em { color:var(--muted); font-size:12px; font-style:normal; }\n.lssfo-refit-footer { display:flex; flex-wrap:wrap; align-items:center; justify-content:flex-end; gap:10px; padding:12px 18px; border-top:.5px solid var(--border-soft); }\n.lssfo-refit-note { flex:1 1 280px; color:var(--muted); font-size:13px; }\n";
  (document.head || document.documentElement).appendChild(style);
})();

(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.LSSFleetCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const number = (value, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };

  function vehicleStaff(type) {
    const staff = type?.staff || {};
    return {
      min: number(staff.min ?? type?.minPersonnel),
      max: number(staff.max ?? type?.maxPersonnel),
    };
  }

  function targetCrew(vehicle, type, mode = "max") {
    const staff = vehicleStaff(type);
    if (mode === "min") return staff.min;
    const override = vehicle?.max_personnel_override;
    const normalizedOverride = number(override, 0);
    return override === null || override === undefined || normalizedOverride <= 0 ? staff.max : normalizedOverride;
  }

  function assignedCrew(vehicle) {
    return number(vehicle?.assigned_personnel_count);
  }

  function flattenTraining(type, allowedSchools = null) {
    const result = [];
    const schools = type?.staff?.training || {};
    for (const [school, entries] of Object.entries(schools)) {
      if (Array.isArray(allowedSchools) && allowedSchools.length && !allowedSchools.includes(school)) continue;
      for (const [key, rule] of Object.entries(entries || {})) {
        result.push({ school, key, rule: rule || {} });
      }
    }
    return result;
  }

  function requiredTrainingCount(rule, target) {
    return rule?.all ? target : Math.max(0, number(rule?.min));
  }

  function analyzeVehicle(vehicle, type, building, mode = "max", educationScan = null) {
    const staff = vehicleStaff(type);
    const target = targetCrew(vehicle, type, mode);
    const assigned = assignedCrew(vehicle);
    const training = flattenTraining(type, building?.schoolingTypes).map((requirement) => {
      const required = requiredTrainingCount(requirement.rule, target);
      const actual = educationScan?.counts?.[requirement.key];
      return {
        ...requirement,
        required,
        actual: actual === undefined ? null : number(actual),
        missing: actual === undefined ? null : Math.max(0, required - number(actual)),
      };
    });
    return {
      id: number(vehicle?.id),
      caption: vehicle?.caption || `Fahrzeug ${vehicle?.id ?? "?"}`,
      typeId: number(vehicle?.vehicle_type, -1),
      typeCaption: type?.caption || `Typ ${vehicle?.vehicle_type ?? "?"}`,
      buildingId: number(vehicle?.building_id),
      buildingCaption: building?.caption || `Wache ${vehicle?.building_id ?? "?"}`,
      staffMin: staff.min,
      staffMax: staff.max,
      target,
      assigned,
      missingCrew: Math.max(0, target - assigned),
      extraCrew: Math.max(0, assigned - target),
      training,
      missingTraining: training.reduce((sum, item) => sum + (item.missing || 0), 0),
      educationScanned: Boolean(educationScan),
    };
  }

  function summarizeBuildings(buildings, analyzedVehicles) {
    const vehiclesByBuilding = new Map();
    for (const vehicle of analyzedVehicles) {
      if (!vehiclesByBuilding.has(vehicle.buildingId)) vehiclesByBuilding.set(vehicle.buildingId, []);
      vehiclesByBuilding.get(vehicle.buildingId).push(vehicle);
    }
    return buildings.map((building) => {
      const vehicles = vehiclesByBuilding.get(number(building.id)) || [];
      const personnel = number(building.personal_count);
      const assigned = vehicles.reduce((sum, vehicle) => sum + vehicle.assigned, 0);
      return {
        id: number(building.id),
        caption: building.caption || `Wache ${building.id}`,
        typeId: number(building.building_type, -1),
        personnel,
        personnelTarget: number(building.personal_count_target),
        assigned,
        free: Math.max(0, personnel - assigned),
        vehicles: vehicles.length,
        targetCrew: vehicles.reduce((sum, vehicle) => sum + vehicle.target, 0),
        missingCrew: vehicles.reduce((sum, vehicle) => sum + vehicle.missingCrew, 0),
        missingTraining: vehicles.reduce((sum, vehicle) => sum + vehicle.missingTraining, 0),
        enabled: building.enabled !== false,
      };
    });
  }

  function summarizeTraining(analyzedVehicles) {
    const map = new Map();
    for (const vehicle of analyzedVehicles) {
      for (const item of vehicle.training) {
        const aggregateKey = `${item.school}:${item.key}`;
        const aggregate = map.get(aggregateKey) || {
          key: item.key,
          school: item.school,
          required: 0,
          actual: 0,
          missing: 0,
          scannedVehicles: 0,
          vehicles: 0,
        };
        aggregate.required += item.required;
        aggregate.vehicles += 1;
        if (item.actual !== null) {
          aggregate.actual += item.actual;
          aggregate.missing += item.missing;
          aggregate.scannedVehicles += 1;
        }
        map.set(aggregateKey, aggregate);
      }
    }
    return [...map.values()].sort((a, b) => a.school.localeCompare(b.school) || a.key.localeCompare(b.key));
  }

  return {
    analyzeVehicle,
    assignedCrew,
    flattenTraining,
    requiredTrainingCount,
    summarizeBuildings,
    summarizeTraining,
    targetCrew,
    vehicleStaff,
  };
});


(() => {
  "use strict";

  if (window.top !== window.self || document.getElementById("lssfo-launcher") || document.getElementById("lssfo-shell")) return;

  const Core = globalThis.LSSFleetCore;
  const CACHE_KEY = "lssfo-cache-v2";
  const SETTINGS_KEY = "lssfo-settings-v1";
  const DB_NAME = "lssfo-database-v2";
  const DB_STORE = "cache";
  const CACHE_TTL = 5 * 60 * 1000;
  const CATALOG_TTL = 12 * 60 * 60 * 1000;
  const standaloneMode = new URLSearchParams(location.search).get("lssfo") === "dashboard";
  const initialSettings = loadSettings();
  const state = {
    open: false,
    loading: false,
    tab: "dashboard",
    query: "",
    onlyMissing: false,
    sorts: {},
    crewMode: initialSettings.crewMode,
    theme: initialSettings.theme,
    effects: ["full", "reduced"].includes(initialSettings.effects) ? initialSettings.effects : "auto",
    buildings: [],
    vehicles: [],
    vehicleTypes: {},
    buildingTypes: {},
    schoolingTypes: {},
    schoolings: [],
    vehicleDistances: [],
    scans: {},
    personnelScans: {},
    personnelScanController: null,
    analyzed: [],
    buildingSummary: [],
    operationalModel: null,
    scanController: null,
    scanProgress: null,
    manager: null,
    courseAssistant: null,
    gameView: null,
    // Fahrzeug-Editor: offene Änderungen je Fahrzeug-ID, Speicherstatus, Umbau-Optionen.
    vehicleEdits: {},
    vehicleEditStatus: {},
    vehicleEditOptions: {},
    vehicleEditBuilding: "all",
    vehicleEditSaving: false,
    refit: null,
    refitStarted: {},
    build: null,
    mapInstance: null,
    mapMarkers: new Map(),
    mapVehicleType: "all",
    mapBuildingType: "all",
    mapDistrict: "all",
    mapDispatchCenter: "all",
    districtsEnabled: initialSettings.districtsEnabled !== false,
    coverageEnabled: initialSettings.coverageEnabled !== false,
    readinessEnabled: initialSettings.readinessEnabled !== false,
    extensionStatus: initialSettings.extensionStatus || "owned",
    extensionLimit: initialSettings.extensionLimit === "all" ? Infinity : Number(initialSettings.extensionLimit) || 100,
    districtGeoJson: undefined,
    districtDisplayGeoJson: undefined,
    buildingStatusSaving: null,
    updatedAt: null,
    error: "",
    tableLimits: {},
  };
  const districtBoxes = new WeakMap();
  const districtCache = new Map();
  const TABLE_PAGE_SIZE = 200;
  // Formatierer einmal anlegen: Neu erzeugte Intl-Objekte je Tabellenzelle sind teuer.
  const textCollator = new Intl.Collator("de", { numeric: true, sensitivity: "base" });
  const numberFormat = new Intl.NumberFormat("de-DE");
  const decimalFormat = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 });

  // Entfernt nur den veralteten Cache dieser Erweiterung. Große Datensätze
  // werden seit Version 1.0.0 in IndexedDB statt im knappen localStorage abgelegt.
  try { localStorage.removeItem(CACHE_KEY); } catch { /* Speicher kann gesperrt sein. */ }

  const launcher = document.createElement("button");
  launcher.id = "lssfo-launcher";
  launcher.type = "button";
  launcher.title = "LSS Verwaltung öffnen";
  launcher.setAttribute("aria-label", "LSS Verwaltung öffnen");
  launcher.innerHTML = `${appGlyph("lssfo-launcher-glyph")}<span>LSS Verwaltung</span>`;
  launcher.addEventListener("click", openDashboard);
  // Das Symbol gehört nur in die Navigationsleiste der Hauptseite. Unterseiten wie
  // /buildings/… oder /vehicles/…/zuweisung haben eine andere Leiste (oder keine).
  if (location.pathname === "/" || globalThis.LSS_TEST_PAGE) mountLauncher();

  const shell = document.createElement("div");
  shell.id = "lssfo-shell";
  shell.hidden = true;
  shell.innerHTML = `
    <div class="lssfo-backdrop" data-action="close"></div>
    <section class="lssfo-panel" role="dialog" aria-modal="true" aria-label="LSS Fuhrpark- und Personalübersicht">
      <header class="lssfo-header">
        <div class="lssfo-header-copy">
          <span class="lssfo-brand-mark" aria-hidden="true">${appGlyph()}</span>
          <div><h1>Fuhrpark &amp; Personal</h1><p id="lssfo-subtitle">Noch keine Daten geladen</p></div>
        </div>
        <div class="lssfo-header-actions">
          <label class="lssfo-theme-control">${icon("theme")}<select id="lssfo-theme-mode" aria-label="Darstellung"><option value="auto">LSS-Design</option><option value="dark">Dunkel</option><option value="light">Hell</option></select></label>
          <label class="lssfo-theme-control" title="Glas-Unschärfe und Animationen. „Sparsam“ entlastet schwächere Rechner.">${icon("gauge")}<select id="lssfo-effects-mode" aria-label="Effekte"><option value="auto">Effekte: Auto</option><option value="full">Effekte: Voll</option><option value="reduced">Effekte: Sparsam</option></select></label>
          <button type="button" class="lssfo-btn lssfo-popout-btn" data-action="popout">${icon("external")}<span>Eigenes Fenster</span></button>
          <button type="button" class="lssfo-btn lssfo-btn-primary" data-action="refresh">${icon("refresh")}<span>Aktualisieren</span></button>
          <button type="button" class="lssfo-icon-btn" data-action="close" aria-label="Schließen">${icon("close")}</button>
        </div>
      </header>
      <div id="lssfo-status" class="lssfo-status" hidden></div>
      <div id="lssfo-kpis" class="lssfo-kpis"></div>
      <nav id="lssfo-tabs" class="lssfo-tabs" aria-label="Bereiche">
        <span class="lssfo-tab-indicator" aria-hidden="true"></span>
        <button type="button" data-tab="dashboard"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("dashboard")}</span><span>Übersicht</span><b data-tab-count="dashboard">0</b></button>
        <button type="button" data-tab="vehicles"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("vehicle")}</span><span>Fahrzeuge</span><b data-tab-count="vehicles">0</b></button>
        <button type="button" data-tab="edit"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("edit")}</span><span>Bearbeiten</span><b data-tab-count="edit">0</b></button>
        <button type="button" data-tab="buildings"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("building")}</span><span>Wachen</span><b data-tab-count="buildings">0</b></button>
        <button type="button" data-tab="regions"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("region")}</span><span>Gebiete</span><b data-tab-count="regions">0</b></button>
        <button type="button" data-tab="extensions"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("extension")}</span><span>Ausbauten</span><b data-tab-count="extensions">0</b></button>
        <button type="button" data-tab="utilization"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("gauge")}</span><span>Auslastung</span><b data-tab-count="utilization">0</b></button>
        <button type="button" data-tab="personnel"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("users")}</span><span>Personalplanung</span><b data-tab-count="personnel">0</b></button>
        <button type="button" data-tab="training"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("training")}</span><span>Ausbildungen</span><b data-tab-count="training">0</b></button>
        <button type="button" data-tab="courses"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("calendar")}</span><span>Lehrgänge</span><b data-tab-count="courses">0</b></button>
        <button type="button" data-tab="map"><span class="lssfo-tab-symbol" aria-hidden="true">${icon("map")}</span><span>Karte</span><b data-tab-count="map">0</b></button>
      </nav>
      <div class="lssfo-toolbar">
        <label class="lssfo-search"><span aria-hidden="true">${icon("search")}</span><input id="lssfo-search" type="search" aria-label="Übersicht durchsuchen" placeholder="Fahrzeug, Wache oder Typ suchen …"></label>
        <label class="lssfo-check"><input id="lssfo-only-missing" type="checkbox"> Nur Fehlbedarf</label>
        <label class="lssfo-select">Soll-Besatzung
          <select id="lssfo-crew-mode">
            <option value="max">Maximal</option>
            <option value="min">Minimum</option>
          </select>
        </label>
        <button type="button" class="lssfo-btn" data-action="scan">${icon("scan")}<span>Ausbildungen prüfen</span></button>
        <button type="button" class="lssfo-btn" data-action="export">${icon("download")}<span>CSV exportieren</span></button>
      </div>
      <main id="lssfo-content" class="lssfo-content"></main>
      <footer class="lssfo-footer">
        <span>Auswertung läuft lokal in deinem Browser.</span>
        <span id="lssfo-source-note">Fahrzeuganforderungen: LSS-Manager-Katalog</span>
      </footer>
    </section>
    <div id="lssfo-manager" class="lssfo-manager" hidden></div>
    <div id="lssfo-course-assistant" class="lssfo-manager" hidden></div>
    <div id="lssfo-game-view" class="lssfo-manager" hidden></div>
    <div id="lssfo-refit" class="lssfo-manager" hidden></div>`;
  document.body.appendChild(shell);
  let shellCloseTimer = 0;
  if (standaloneMode) document.documentElement.classList.add("lssfo-standalone");

  // Eigene Ebene für die Wachenplaner-Brücke, damit der Bau-Dialog auch bei
  // geschlossener Übersicht erscheinen kann.
  const plannerRoot = document.createElement("div");
  plannerRoot.id = "lssfo-planner";
  plannerRoot.innerHTML = '<div id="lssfo-build" class="lssfo-manager" hidden></div><div class="lssfo-planner-pill" hidden><i></i><span>Wachenplaner verbunden</span></div><div class="lssfo-toast" role="status" aria-live="polite"></div>';
  document.body.appendChild(plannerRoot);
  applyTheme();
  window.addEventListener("resize", positionTabIndicator);

  shell.addEventListener("click", handleClick);
  // Große Tabellen werden erst neu aufgebaut, wenn kurz nicht mehr getippt wird.
  let searchTimer = 0;
  shell.querySelector("#lssfo-search").addEventListener("input", (event) => {
    state.query = event.target.value.trim().toLocaleLowerCase("de");
    state.tableLimits = {};
    clearTimeout(searchTimer);
    searchTimer = setTimeout(renderContent, 180);
  });
  shell.querySelector("#lssfo-only-missing").addEventListener("change", (event) => {
    state.onlyMissing = event.target.checked;
    renderContent();
  });
  shell.querySelector("#lssfo-crew-mode").value = state.crewMode;
  shell.querySelector("#lssfo-crew-mode").addEventListener("change", (event) => {
    state.crewMode = event.target.value;
    saveSettings({ crewMode: state.crewMode });
    analyze();
    render();
  });
  shell.addEventListener("input", (event) => {
    if (event.target.matches?.('[data-edit-field="caption"]')) {
      setVehicleEdit(Number(event.target.dataset.editId), "caption", event.target.value);
      return;
    }
    if (event.target.id !== "lssfo-manager-person-search") return;
    const query = event.target.value.trim().toLocaleLowerCase("de");
    if (state.manager) state.manager.personQuery = query;
    for (const row of shell.querySelectorAll("[data-person-row]")) {
      row.hidden = !row.dataset.search.includes(query);
    }
  });
  shell.addEventListener("change", (event) => {
    if (event.target.matches?.('[data-edit-field="max"], [data-edit-field="type"]')) {
      setVehicleEdit(Number(event.target.dataset.editId), event.target.dataset.editField, event.target.value);
      return;
    }
    if (event.target.id === "lssfo-refit-preset") {
      applyRefitPreset(event.target.value);
      return;
    }
    if (event.target.matches?.("[data-refit-field]")) {
      if (state.refit) {
        state.refit.values[event.target.dataset.refitField] = event.target.value;
        state.refit.confirming = false;
        updateRefitFooter();
      }
      return;
    }
    if (event.target.id === "lssfo-edit-building") {
      state.vehicleEditBuilding = event.target.value;
      renderContent();
      return;
    }
    if (event.target.id === "lssfo-theme-mode") {
      state.theme = event.target.value;
      saveSettings({ theme: state.theme });
      applyTheme();
      return;
    }
    if (event.target.id === "lssfo-effects-mode") {
      state.effects = event.target.value;
      saveSettings({ effects: state.effects });
      applyTheme();
      return;
    }
    if (event.target.id === "lssfo-map-vehicle-filter") {
      state.mapVehicleType = event.target.value;
      renderContent();
      return;
    }
    if (event.target.id === "lssfo-map-building-filter") {
      state.mapBuildingType = event.target.value;
      renderContent();
      return;
    }
    if (event.target.id === "lssfo-map-district-filter") {
      state.mapDistrict = event.target.value;
      renderContent();
      return;
    }
    if (event.target.id === "lssfo-map-dispatch-filter") {
      state.mapDispatchCenter = event.target.value;
      renderContent();
      return;
    }
    if (event.target.id === "lssfo-map-coverage-toggle") {
      state.coverageEnabled = event.target.checked;
      saveSettings({ coverageEnabled: state.coverageEnabled });
      renderContent();
      return;
    }
    if (event.target.id === "lssfo-map-readiness-toggle") {
      state.readinessEnabled = event.target.checked;
      saveSettings({ readinessEnabled: state.readinessEnabled });
      renderContent();
      return;
    }
    if (event.target.id === "lssfo-extension-status") {
      state.extensionStatus = event.target.value;
      saveSettings({ extensionStatus: state.extensionStatus });
      renderContent();
      return;
    }
    if (event.target.id === "lssfo-extension-limit") {
      state.extensionLimit = event.target.value === "all" ? Infinity : Math.max(25, Number(event.target.value) || 100);
      saveSettings({ extensionLimit: Number.isFinite(state.extensionLimit) ? state.extensionLimit : "all" });
      renderContent();
      return;
    }
    if (event.target.id === "lssfo-map-district-toggle") {
      state.districtsEnabled = event.target.checked;
      if (!state.districtsEnabled) state.mapDistrict = "all";
      saveSettings({ districtsEnabled: state.districtsEnabled });
      renderContent();
      return;
    }
    if (event.target.id !== "lssfo-course-school") return;
    if (state.courseAssistant) {
      state.courseAssistant.schoolId = Number(event.target.value) || null;
      renderCourseAssistant();
    }
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.documentElement.classList.contains("lssfo-lightbox-front")) return;
    if (event.key === "Escape" && state.build) closeBuildDialog();
    else if (event.key === "Escape" && state.gameView) closeGameView();
    else if (event.key === "Escape" && state.refit) closeRefit();
    else if (event.key === "Escape" && state.courseAssistant) closeCourseAssistant();
    else if (event.key === "Escape" && state.manager) closeManager();
    else if (event.key === "Escape" && state.open) closeDashboard();
  });
  if (standaloneMode) setTimeout(openDashboard, 0);
  // LSS ändert Klassen und Stile an <html>/<body> häufig; die Theme-Erkennung
  // läuft deshalb höchstens einmal pro Frame.
  let themeFrame = 0;
  const ownClasses = /\b(?:lssfo-open|lssfo-standalone|lssfo-lightbox-front|lsswp-open|leaflet-dragging)\b/g;
  const themeObserver = new MutationObserver((mutations) => {
    // Eigene Klassen (auch die des Wachenplaners) und Leaflets Zieh-Klasse ändern das Theme nicht.
    const relevant = mutations.some((mutation) => mutation.attributeName !== "class"
      || String(mutation.oldValue || "").replace(ownClasses, "").trim() !== String(mutation.target.getAttribute("class") || "").replace(ownClasses, "").trim());
    if (!relevant || state.theme !== "auto" || themeFrame) return;
    themeFrame = requestAnimationFrame(() => {
      themeFrame = 0;
      applyTheme();
    });
  });
  const themeAttributes = { attributes: true, attributeOldValue: true, attributeFilter: ["class", "style", "data-theme", "data-bs-theme"] };
  themeObserver.observe(document.documentElement, themeAttributes);
  themeObserver.observe(document.body, themeAttributes);
  window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener?.("change", () => {
    if (state.theme === "auto") applyTheme();
  });

  // Wachenplaner-Brücke: Der Wachenplaner (lss_einsatzkarte) öffnet das Spiel
  // mit ?lssfo=planner. Nachrichten werden nur vom öffnenden Fenster angenommen,
  // Gebäudedaten gehen erst nach ausdrücklicher Zustimmung hinaus.
  const PLANNER_SESSION_KEY = "lssfo-planner";
  const PLANNER_CONSENT_KEY = "lssfo-planner-consent";
  const FIRE_BUILDING_TYPES = new Set([0, 18]);
  const RESCUE_BUILDING_TYPES = new Set([2, 20]);
  const HOSPITAL_BUILDING_TYPES = new Set([4]);
  const POLICE_BUILDING_TYPES = new Set([6, 19]);
  // Je Art: LSS-Gebäudetyp, Farbe und Überschrift im Bau-Dialog der Wachenplaner-Brücke.
  const PLANNER_KINDS = {
    fire: { type: "0", color: "#ff6a00", headline: "NEUE FEUERWACHE", pattern: /feuerwache/i, exact: /^feuerwache$/i },
    rescue: { type: "2", color: "#ff3b30", headline: "NEUE RETTUNGSWACHE", pattern: /rettungswache/i, exact: /^rettungswache$/i },
    hospital: { type: "4", color: "#0a84ff", headline: "NEUES KRANKENHAUS", pattern: /krankenhaus/i, exact: /^krankenhaus$/i },
    police: { type: "6", color: "#1c3f94", headline: "NEUE POLIZEIWACHE", pattern: /polizeiwache/i, exact: /^polizeiwache$/i },
  };
  const plannerOpener = detectPlannerOpener();
  plannerRoot.addEventListener("click", handlePlannerClick);
  plannerRoot.addEventListener("input", (event) => {
    if (!event.target.closest("#lssfo-build")) return;
    readBuildInputs();
    // Anderer Gebäudetyp → passende Zusatzfelder (z. B. Startfahrzeug) einblenden.
    if (event.target.id === "lssfo-build-type") renderBuild();
  });
  plannerRoot.addEventListener("toggle", (event) => {
    if (state.build && event.target.matches?.(".lssfo-build-more")) state.build.moreOpen = event.target.open;
  }, true);
  if (plannerOpener) {
    plannerRoot.querySelector(".lssfo-planner-pill").hidden = false;
    window.addEventListener("message", handlePlannerMessage);
    postToPlanner({ type: "lssfo-ready" });
  }

  function mountLauncher(attempt = 0) {
    const navRoots = [...document.querySelectorAll("nav, header, .navbar, #navbar-main-collapse, #navbar-collapse")];
    const forumLink = navRoots.flatMap((root) => [...root.querySelectorAll("a")]).find((anchor) => {
      const label = `${anchor.textContent || ""} ${anchor.title || ""} ${anchor.getAttribute("aria-label") || ""}`;
      return /forum/i.test(label) || /forum/i.test(anchor.href || "");
    });
    const forumItem = forumLink?.closest("li.dropdown") || forumLink?.closest("li") || forumLink;
    const fallbackList = document.querySelector("#navbar-main-collapse .navbar-right, #navbar-collapse .navbar-right, nav .navbar-right, .navbar .navbar-nav");
    const reference = forumItem || null;
    const parent = reference?.parentElement || fallbackList;
    if (parent) {
      let host = document.getElementById("lssfo-launcher-host");
      if (!host) {
        host = document.createElement(parent.tagName === "UL" || parent.tagName === "OL" ? "li" : "span");
        host.id = "lssfo-launcher-host";
        host.className = "lssfo-navbar-item";
      }
      if (reference?.parentElement === parent) reference.insertAdjacentElement("afterend", host);
      else parent.appendChild(host);
      host.appendChild(launcher);
      launcher.classList.add("lssfo-navbar-launcher");
      return;
    }
    // Kein schwebender Ersatzknopf: lieber warten, bis die Leiste da ist.
    if (attempt < 40) setTimeout(() => mountLauncher(attempt + 1), 250);
  }

  function loadSettings() {
    if (typeof GM_getValue === "function") {
      try {
        return { crewMode: "max", theme: "auto", ...JSON.parse(GM_getValue(SETTINGS_KEY, "{}")) };
      } catch {
        return { crewMode: "max", theme: "auto" };
      }
    }
    try {
      return { crewMode: "max", theme: "auto", ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}") };
    } catch {
      return { crewMode: "max", theme: "auto" };
    }
  }

  function saveSettings(settings) {
    const serialized = JSON.stringify({ crewMode: state.crewMode, theme: state.theme, effects: state.effects, districtsEnabled: state.districtsEnabled, coverageEnabled: state.coverageEnabled, readinessEnabled: state.readinessEnabled, extensionStatus: state.extensionStatus, extensionLimit: Number.isFinite(state.extensionLimit) ? state.extensionLimit : "all", ...settings });
    if (typeof GM_setValue === "function") {
      try { GM_setValue(SETTINGS_KEY, serialized); } catch { /* Einstellung gilt für diese Sitzung. */ }
      return;
    }
    try { localStorage.setItem(SETTINGS_KEY, serialized); } catch { /* Einstellung gilt für diese Sitzung. */ }
  }

  function applyTheme() {
    const effectiveTheme = state.theme === "auto" ? detectLssTheme() : state.theme;
    shell.dataset.theme = effectiveTheme;
    plannerRoot.dataset.theme = effectiveTheme;
    const lite = state.effects === "reduced" || (state.effects === "auto" && isLowEndDevice());
    shell.classList.toggle("lssfo-lite", lite);
    plannerRoot.classList.toggle("lssfo-lite", lite);
    const select = shell.querySelector("#lssfo-theme-mode");
    if (select) select.value = state.theme;
    const effectsSelect = shell.querySelector("#lssfo-effects-mode");
    if (effectsSelect) effectsSelect.value = state.effects;
  }

  // Schwächere Geräte: wenige Kerne, wenig Speicher oder ausdrücklich
  // gewünschte reduzierte Transparenz im Betriebssystem.
  function isLowEndDevice() {
    return (navigator.hardwareConcurrency || 8) <= 4
      || (navigator.deviceMemory || 8) <= 4
      || Boolean(window.matchMedia?.("(prefers-reduced-transparency: reduce)").matches);
  }

  function detectLssTheme() {
    const rootTheme = `${document.documentElement.dataset.theme || ""} ${document.documentElement.dataset.bsTheme || ""}`;
    const bodyTheme = `${document.body.dataset.theme || ""} ${document.body.dataset.bsTheme || ""}`;
    if (/dark/i.test(`${rootTheme} ${bodyTheme}`) || document.documentElement.classList.contains("dark") || document.body.classList.contains("dark")) return "dark";
    const color = getComputedStyle(document.body).backgroundColor.match(/[\d.]+/g)?.slice(0, 3).map(Number);
    if (color?.length === 3 && (color[0] * .299 + color[1] * .587 + color[2] * .114) < 105) return "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  async function openDashboard() {
    clearTimeout(shellCloseTimer);
    state.open = true;
    // Theme bestimmen, solange die Übersicht noch verborgen ist – das Auslesen
    // der Seitenfarbe erzwingt sonst eine Stilberechnung für das ganze Fenster.
    applyTheme();
    shell.classList.remove("is-closing");
    shell.hidden = false;
    document.documentElement.classList.add("lssfo-open");
    render();
    animateContent();
    if (!state.vehicles.length) await loadData(false);
  }

  function closeDashboard() {
    if (standaloneMode) {
      window.close();
      return;
    }
    closeManager();
    closeCourseAssistant();
    closeGameView();
    state.open = false;
    shell.classList.add("is-closing");
    document.documentElement.classList.remove("lssfo-open");
    shellCloseTimer = setTimeout(() => {
      if (state.open) return;
      destroyOverviewMap();
      shell.hidden = true;
      shell.classList.remove("is-closing");
    }, 260);
  }

  // Spielt die Einblendung nur beim Bereichswechsel ab, nicht bei jeder Suche.
  // Klasse im nächsten Frame setzen statt per offsetWidth ein Zusatz-Layout zu erzwingen.
  function animateContent() {
    const content = shell.querySelector("#lssfo-content");
    content.classList.remove("lssfo-enter");
    requestAnimationFrame(() => content.classList.add("lssfo-enter"));
  }

  function revealActiveTab() {
    requestAnimationFrame(() => {
      const nav = shell.querySelector("#lssfo-tabs");
      const active = nav?.querySelector(`[data-tab="${state.tab}"]`);
      if (!active) return;
      const left = active.offsetLeft;
      const right = left + active.offsetWidth;
      if (left < nav.scrollLeft) nav.scrollTo({ left: left - 12, behavior: "smooth" });
      else if (right > nav.scrollLeft + nav.clientWidth) nav.scrollTo({ left: right - nav.clientWidth + 12, behavior: "smooth" });
    });
  }

  function positionTabIndicator() {
    const indicator = shell.querySelector(".lssfo-tab-indicator");
    const active = shell.querySelector(`#lssfo-tabs [data-tab="${state.tab}"]`);
    if (!indicator || !active || !active.offsetWidth) return;
    indicator.style.width = `${active.offsetWidth}px`;
    indicator.style.transform = `translateX(${active.offsetLeft}px)`;
  }

  function handleClick(event) {
    const tab = event.target.closest("[data-tab]");
    if (tab) {
      const changed = state.tab !== tab.dataset.tab;
      state.tab = tab.dataset.tab;
      render();
      if (changed) {
        animateContent();
        revealActiveTab();
      }
      return;
    }
    const gameLink = event.target.closest('a[href^="/buildings/"], a[href^="/vehicles/"]');
    if (gameLink && !event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0) {
      event.preventDefault();
      openGameView(gameLink.getAttribute("href"), gameLink.textContent.trim());
      return;
    }
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "close") closeDashboard();
    if (action === "edit-save-all") void saveVehicleEdits();
    if (action === "edit-discard") discardVehicleEdits();
    if (action === "edit-replace") applyNameReplace();
    if (action === "edit-load-building") void loadBuildingOptions();
    if (action === "refit-open") void openRefit(Number(event.target.closest("[data-edit-id]").dataset.editId));
    if (action === "refit-close") closeRefit();
    if (action === "refit-confirm") confirmRefit();
    if (action === "refit-submit") void submitRefit();
    if (action === "edit-load-options") void loadVehicleOptions(Number(event.target.closest("[data-edit-id]").dataset.editId));
    if (action === "game-view-close") closeGameView();
    if (action === "game-view-back") {
      try { shell.querySelector("#lssfo-game-frame")?.contentWindow?.history.back(); } catch { /* Verlauf nicht verfügbar. */ }
    }
    if (action === "game-view-reload") {
      try { shell.querySelector("#lssfo-game-frame")?.contentWindow?.location.reload(); } catch { /* Neu laden nicht möglich. */ }
    }
    if (action === "refresh") loadData(true);
    if (action === "popout") openStandaloneDashboard();
    if (action === "scan") state.scanController ? stopScan() : scanEducations();
    if (action === "scan-personnel") state.personnelScanController ? state.personnelScanController.abort() : scanStationPersonnel();
    if (action === "export") exportCsv();
    if (action === "manage-vehicle") openManager("vehicle", Number(event.target.closest("[data-id]").dataset.id));
    if (action === "manage-building") openManager("building", Number(event.target.closest("[data-id]").dataset.id));
    if (action === "manager-close") closeManager();
    if (action === "manager-save") saveManager();
    if (action === "building-status-toggle") toggleBuildingStatus(Number(event.target.closest("[data-building-id]").dataset.buildingId));
    if (action === "person-toggle") togglePersonnel(Number(event.target.closest("[data-person-id]").dataset.personId));
    if (action === "map-focus") focusMapBuilding(Number(event.target.closest("[data-building-id]").dataset.buildingId));
    if (action === "map-filter-reset") {
      state.mapVehicleType = "all";
      state.mapBuildingType = "all";
      state.mapDistrict = "all";
      state.mapDispatchCenter = "all";
      renderContent();
    }
    if (action === "course-open") openCourseAssistant();
    if (action === "course-close") closeCourseAssistant();
    if (action === "course-open-school" && state.courseAssistant?.schoolId) {
      const schoolId = state.courseAssistant.schoolId;
      closeCourseAssistant();
      openGameLightbox(`/buildings/${schoolId}`);
    }
    if (action === "table-sort") {
      const control = event.target.closest("[data-sort-table]");
      changeTableSort(control.dataset.sortTable, Number(control.dataset.sortColumn));
    }
    if (action === "table-more" || action === "table-all") {
      const tableKey = event.target.closest("[data-table]").dataset.table;
      state.tableLimits[tableKey] = action === "table-all" ? Infinity : (state.tableLimits[tableKey] || TABLE_PAGE_SIZE) + TABLE_PAGE_SIZE;
      renderContent();
    }
  }

  function openStandaloneDashboard() {
    if (standaloneMode) return;
    const url = new URL("/", location.origin);
    url.searchParams.set("lssfo", "dashboard");
    window.open(url.href, "_blank", "noopener");
  }

  function changeTableSort(tableKey, column) {
    const current = state.sorts[tableKey];
    state.sorts[tableKey] = {
      column,
      direction: current?.column === column && current.direction === "asc" ? "desc" : "asc",
    };
    if (tableKey === "personnel") renderManager();
    else renderContent();
  }

  async function fetchJson(url) {
    if (/^https:\/\/api\.lss-manager\.de\//.test(url) && typeof GM_xmlhttpRequest === "function") {
      return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
          method: "GET",
          url,
          responseType: "json",
          timeout: 20000,
          anonymous: true,
          onload: (response) => {
            if (response.status < 200 || response.status >= 300) {
              reject(new Error(`${response.status} ${response.statusText || "Fehler"} (${url})`));
              return;
            }
            try {
              resolve(response.response ?? JSON.parse(response.responseText));
            } catch (error) {
              reject(new Error(`Ungültige Antwort (${url}): ${error.message}`));
            }
          },
          ontimeout: () => reject(new Error(`Zeitüberschreitung (${url})`)),
          onerror: () => reject(new Error(`Netzwerkfehler (${url})`)),
        });
      });
    }
    const response = await fetch(url, { credentials: "include", headers: { Accept: "application/json" } });
    if (!response.ok) {
      const error = new Error(`${response.status} ${response.statusText} (${url})`);
      error.status = response.status;
      throw error;
    }
    return response.json();
  }

  // Überlastung (429/5xx) ist bei der LSS-API meist vorübergehend: mit wachsender Pause erneut versuchen.
  async function fetchJsonWithRetry(url, attempts = 4) {
    for (let attempt = 1; ; attempt += 1) {
      try {
        return await fetchJson(url);
      } catch (error) {
        const retryable = error.status === 429 || error.status >= 500;
        if (!retryable || attempt >= attempts) throw error;
        await new Promise((resolve) => setTimeout(resolve, 1000 * 2 ** (attempt - 1)));
      }
    }
  }

  // Fahrzeuge seitenweise laden: große Seiten (limit=10000) beantwortet der Server bei vielen
  // Fahrzeugen mit 503. Die API liefert in paging.next_page die URL der Folgeseite.
  const VEHICLE_PAGE_SIZE = 1000;

  async function fetchAllVehicles() {
    let url = `/api/v2/vehicles?limit=${VEHICLE_PAGE_SIZE}`;
    const seenUrls = new Set();
    const vehiclesById = new Map();
    while (url && !seenUrls.has(url)) {
      seenUrls.add(url);
      const page = await fetchJsonWithRetry(url);
      for (const vehicle of page.result || []) vehiclesById.set(vehicle.id, vehicle);
      url = page.paging?.next_page || "";
      if (url) await new Promise((resolve) => setTimeout(resolve, 150));
    }
    return [...vehiclesById.values()];
  }

  function openDatabase() {
    return new Promise((resolve, reject) => {
      if (!globalThis.indexedDB) {
        reject(new Error("IndexedDB ist nicht verfügbar"));
        return;
      }
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(DB_STORE)) request.result.createObjectStore(DB_STORE);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("IndexedDB konnte nicht geöffnet werden"));
    });
  }

  async function readCache() {
    try {
      const database = await openDatabase();
      return await new Promise((resolve, reject) => {
        const transaction = database.transaction(DB_STORE, "readonly");
        const request = transaction.objectStore(DB_STORE).get(CACHE_KEY);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
        transaction.oncomplete = () => database.close();
      });
    } catch {
      return null;
    }
  }

  async function writeCache(value) {
    const database = await openDatabase();
    return new Promise((resolve, reject) => {
      const transaction = database.transaction(DB_STORE, "readwrite");
      transaction.objectStore(DB_STORE).put(value, CACHE_KEY);
      transaction.oncomplete = () => { database.close(); resolve(); };
      transaction.onerror = () => { database.close(); reject(transaction.error); };
      transaction.onabort = () => { database.close(); reject(transaction.error || new Error("Cache konnte nicht gespeichert werden")); };
    });
  }

  async function persistCurrentCache() {
    try {
      const previous = await readCache();
      await writeCache({
        buildings: state.buildings,
        vehicles: state.vehicles,
        schoolings: state.schoolings,
        vehicleDistances: state.vehicleDistances,
        vehicleTypes: state.vehicleTypes,
        buildingTypes: state.buildingTypes,
        schoolingTypes: state.schoolingTypes,
        updatedAt: state.updatedAt || Date.now(),
        catalogUpdatedAt: previous?.catalogUpdatedAt || Date.now(),
      });
    } catch (error) {
      console.warn("LSS Fuhrparkübersicht: Änderungen konnten nicht zwischengespeichert werden.", error);
    }
  }

  async function loadData(force) {
    if (state.loading) return;
    state.loading = true;
    state.error = "";
    render();
    try {
      const cached = await readCache();
      const useMainCache = !force && cached && Date.now() - cached.updatedAt < CACHE_TTL;
      const useCatalogCache = cached && Date.now() - (cached.catalogUpdatedAt || 0) < CATALOG_TTL;
      const mainPromise = useMainCache
        ? Promise.resolve([cached.buildings, cached.vehicles, cached.schoolings || [], cached.vehicleDistances || []])
        : Promise.all([fetchJson("/api/buildings"), fetchAllVehicles(), fetchJson("/api/schoolings").catch(() => []), fetchJson("/api/v1/vehicle_distances.json").catch(() => ({ result: [] }))]);
      const catalogPromise = useCatalogCache
        ? Promise.resolve([cached.vehicleTypes, cached.buildingTypes, cached.schoolingTypes || {}])
        : Promise.all([
            fetchJson("https://api.lss-manager.de/de_DE/vehicles"),
            fetchJson("https://api.lss-manager.de/de_DE/buildings"),
            fetchJson("https://api.lss-manager.de/de_DE/schoolings"),
          ]).catch(() => [cached?.vehicleTypes || {}, cached?.buildingTypes || {}, cached?.schoolingTypes || {}]);
      const [[buildings, vehicles, schoolings, vehicleDistances], [vehicleTypes, buildingTypes, schoolingTypes]] = await Promise.all([mainPromise, catalogPromise]);
      state.buildings = Array.isArray(buildings) ? buildings : buildings?.result || [];
      state.vehicles = Array.isArray(vehicles) ? vehicles : vehicles?.result || [];
      state.schoolings = Array.isArray(schoolings) ? schoolings : schoolings?.result || [];
      state.vehicleDistances = Array.isArray(vehicleDistances) ? vehicleDistances : vehicleDistances?.result || [];
      state.vehicleTypes = vehicleTypes || {};
      state.buildingTypes = buildingTypes || {};
      state.schoolingTypes = schoolingTypes || {};
      state.updatedAt = useMainCache ? cached.updatedAt : Date.now();
      const cacheValue = {
        buildings: state.buildings,
        vehicles: state.vehicles,
        schoolings: state.schoolings,
        vehicleDistances: state.vehicleDistances,
        vehicleTypes: state.vehicleTypes,
        buildingTypes: state.buildingTypes,
        schoolingTypes: state.schoolingTypes,
        updatedAt: state.updatedAt,
        catalogUpdatedAt: useCatalogCache ? cached.catalogUpdatedAt : Date.now(),
      };
      try {
        await writeCache(cacheValue);
      } catch (cacheError) {
        console.warn("LSS Fuhrparkübersicht: Cache konnte nicht gespeichert werden.", cacheError);
      }
      analyze();
    } catch (error) {
      state.error = `Daten konnten nicht geladen werden: ${error.message}`;
    } finally {
      state.loading = false;
      render();
    }
  }

  function analyze() {
    const buildingMap = new Map(state.buildings.map((building) => {
      const type = state.buildingTypes[String(building.building_type)] || {};
      return [Number(building.id), { ...building, schoolingTypes: type.schoolingTypes || [] }];
    }));
    state.analyzed = state.vehicles.map((vehicle) => Core.analyzeVehicle(
      vehicle,
      state.vehicleTypes[String(vehicle.vehicle_type)],
      buildingMap.get(Number(vehicle.building_id)),
      state.crewMode,
      state.scans[String(vehicle.id)] || null,
    ));
    state.buildingSummary = Core.summarizeBuildings(state.buildings, state.analyzed);
    state.operationalModel = buildOperationalModel();
  }

  function render() {
    renderStatus();
    renderKpis();
    for (const button of shell.querySelectorAll("#lssfo-tabs [data-tab]")) {
      button.classList.toggle("active", button.dataset.tab === state.tab);
    }
    positionTabIndicator();
    shell.querySelector(".lssfo-panel")?.classList.toggle("lssfo-map-mode", state.tab === "map");
    const popoutButton = shell.querySelector('[data-action="popout"]');
    if (popoutButton) popoutButton.hidden = standaloneMode;
    const tabCounts = {
      dashboard: state.operationalModel?.alerts.length || 0,
      vehicles: state.vehicles.length,
      edit: Object.keys(state.vehicleEdits).length,
      buildings: state.buildings.length,
      regions: state.operationalModel?.regions.length || 0,
      extensions: state.operationalModel?.extensions.filter((entry) => entry.status !== "missing").length || 0,
      utilization: state.vehicleDistances.length,
      personnel: state.operationalModel?.personnelRows.length || 0,
      training: Core.summarizeTraining(state.analyzed).length,
      courses: state.schoolings.length,
      map: state.buildings.filter((building) => Number.isFinite(Number(building.latitude)) && Number.isFinite(Number(building.longitude))).length,
    };
    for (const counter of shell.querySelectorAll("[data-tab-count]")) {
      counter.textContent = formatNumber(tabCounts[counter.dataset.tabCount] || 0);
    }
    const scanButton = shell.querySelector('[data-action="scan"]');
    scanButton.innerHTML = state.scanController
      ? `${icon("stop")}<span>Prüfung stoppen</span>`
      : `${icon("scan")}<span>Ausbildungen prüfen</span>`;
    shell.querySelector("#lssfo-subtitle").textContent = state.updatedAt
      ? `Stand ${new Date(state.updatedAt).toLocaleString("de-DE")} · ${state.crewMode === "max" ? "Maximalbesatzung" : "Mindestbesatzung"}`
      : "Noch keine Daten geladen";
    renderContent();
  }

  function renderStatus() {
    const element = shell.querySelector("#lssfo-status");
    if (state.error) {
      element.hidden = false;
      element.className = "lssfo-status error";
      element.textContent = state.error;
    } else if (state.scanProgress) {
      element.hidden = false;
      element.className = "lssfo-status";
      element.innerHTML = `<span class="lssfo-spinner"></span> ${escapeHtml(state.scanProgress)}`;
    } else if (state.loading) {
      element.hidden = false;
      element.className = "lssfo-status";
      element.innerHTML = '<span class="lssfo-spinner"></span> Wachen, Fahrzeuge und Lehrgänge werden geladen …';
    } else {
      element.hidden = true;
    }
  }

  function renderKpis() {
    const missingCrew = state.analyzed.reduce((sum, item) => sum + item.missingCrew, 0);
    const affected = state.analyzed.filter((item) => item.missingCrew || item.missingTraining).length;
    const dispatchCount = state.operationalModel?.dispatchCenters.length || 0;
    const stationCount = Math.max(0, state.buildings.length - dispatchCount);
    const personnel = (state.operationalModel?.stationBuildings || []).reduce((sum, building) => sum + Number(building.personal_count || 0), 0);
    shell.querySelector("#lssfo-kpis").innerHTML = [
      kpi("Fahrzeuge", formatNumber(state.vehicles.length), "im Fuhrpark"),
      kpi("Gebäude", formatNumber(state.buildings.length), `${formatNumber(stationCount)} weitere · ${formatNumber(dispatchCount)} ${dispatchCount === 1 ? "Leitstelle" : "Leitstellen"}`),
      kpi("Personal", formatNumber(personnel), "an personalführenden Wachen"),
      kpi("Fehlende Besatzung", formatNumber(missingCrew), affected ? `${formatNumber(affected)} Fahrzeuge auffällig` : "alles vollständig", missingCrew > 0),
    ].join("");
  }

  function kpi(label, value, hint, danger = false) {
    const icons = { Fahrzeuge: "vehicle", Wachen: "building", Gebäude: "building", Personal: "users", "Fehlende Besatzung": "alert" };
    return `<article class="lssfo-kpi${danger ? " danger" : ""}"><div class="lssfo-kpi-label"><i aria-hidden="true">${icon(icons[label] || "app")}</i><span>${escapeHtml(label)}</span></div><strong>${escapeHtml(value)}</strong><small>${escapeHtml(hint)}</small></article>`;
  }

  function renderContent() {
    const content = shell.querySelector("#lssfo-content");
    destroyOverviewMap();
    if (!state.vehicles.length && state.loading) {
      content.innerHTML = '<div class="lssfo-empty">Daten werden vorbereitet …</div>';
      return;
    }
    if (!state.vehicleTypes || !Object.keys(state.vehicleTypes).length) {
      content.innerHTML = '<div class="lssfo-empty">Der Fahrzeugkatalog konnte nicht geladen werden. Bitte prüfe die Internetverbindung und aktualisiere erneut.</div>';
      return;
    }
    if (state.tab === "dashboard") renderDashboard(content);
    if (state.tab === "vehicles") renderVehicles(content);
    if (state.tab === "edit") renderVehicleEditor(content);
    if (state.tab === "buildings") renderBuildings(content);
    if (state.tab === "regions") renderRegions(content);
    if (state.tab === "extensions") renderExtensions(content);
    if (state.tab === "utilization") renderUtilization(content);
    if (state.tab === "personnel") renderPersonnelPlanning(content);
    if (state.tab === "training") renderTraining(content);
    if (state.tab === "courses") renderCourses(content);
    if (state.tab === "map") renderMap(content);
  }

  function matchesQuery(...values) {
    return !state.query || values.some((value) => String(value ?? "").toLocaleLowerCase("de").includes(state.query));
  }

  function normalizedDispatchId(value) {
    if (value === null || value === undefined || value === "") return null;
    const id = Number(value);
    return Number.isFinite(id) && id > 0 ? id : null;
  }

  function isDispatchCenterBuilding(building, type, referencedIds) {
    const id = Number(building.id);
    return referencedIds.has(id)
      || Number(building.building_type) === 7
      || type?.isDispatchCenter === true
      || type?.is_dispatch_center === true
      || /leitstell|dispatch/i.test(type?.caption || "");
  }

  function isOperationalBuilding(building) {
    if (building.isDispatchCenter) return false;
    if (building.vehicles.length || Number(building.personal_count || 0) > 0 || Number(building.personal_count_target || 0) > 0) return true;
    return !/schule|akademie|leitstell|dispatch|krankenhaus|hospital|bereitstellungsraum|verband/i.test(building.typeCaption || "");
  }

  function buildOperationalModel() {
    const buildingById = new Map(state.buildings.map((building) => [Number(building.id), building]));
    const summaryById = new Map(state.buildingSummary.map((building) => [Number(building.id), building]));
    const vehiclesByBuilding = new Map();
    const distanceByVehicle = new Map(state.vehicleDistances.map((entry) => [Number(entry.vehicle_id), entry]));
    const districtGeoJson = getDistrictGeoJson();
    for (const vehicle of state.analyzed) {
      if (!vehiclesByBuilding.has(vehicle.buildingId)) vehiclesByBuilding.set(vehicle.buildingId, []);
      vehiclesByBuilding.get(vehicle.buildingId).push(vehicle);
    }
    const referencedDispatchIds = new Set(state.buildings.map((building) => normalizedDispatchId(building.leitstelle_building_id)).filter((id) => id !== null));
    const dispatchCenters = state.buildings.filter((building) => isDispatchCenterBuilding(building, state.buildingTypes[String(building.building_type)] || {}, referencedDispatchIds));
    const dispatchById = new Map(dispatchCenters.map((building) => [Number(building.id), building]));
    const buildings = state.buildings.map((building) => {
      const id = Number(building.id);
      const type = state.buildingTypes[String(building.building_type)] || {};
      const districtFeature = districtFeatureAtPoint(Number(building.longitude), Number(building.latitude), districtGeoJson);
      const district = formatDistrictName(districtFeature?.properties?.name);
      const federalState = federalStateFromFeature(districtFeature);
      const dispatchCenterId = normalizedDispatchId(building.leitstelle_building_id);
      return {
        ...building,
        id,
        typeCaption: type.caption || `Typ ${building.building_type}`,
        summary: summaryById.get(id) || {},
        vehicles: vehiclesByBuilding.get(id) || [],
        district,
        federalState,
        dispatchCenterId,
        dispatchCenterCaption: dispatchCenterId ? dispatchById.get(dispatchCenterId)?.caption || `Leitstelle ${dispatchCenterId}` : "Ohne Leitstelle",
        isDispatchCenter: dispatchById.has(id),
      };
    });
    const stationBuildings = buildings.filter((building) => !building.isDispatchCenter);
    const operationalBuildings = stationBuildings.filter(isOperationalBuilding);
    const referenceVehicleTypes = new Map();
    const referenceBuildingTypes = new Map();
    for (const building of stationBuildings) {
      if (!/schule|akademie|krankenhaus|bereitstellungsraum|verband/i.test(building.typeCaption)) {
        referenceBuildingTypes.set(String(building.building_type), building.typeCaption);
      }
      for (const vehicle of building.vehicles) referenceVehicleTypes.set(String(vehicle.typeId), vehicle.typeCaption);
    }
    const regionGroups = new Map();
    for (const building of operationalBuildings) {
      const key = building.dispatchCenterId === null ? "none" : String(building.dispatchCenterId);
      if (!regionGroups.has(key)) regionGroups.set(key, { key, caption: building.dispatchCenterCaption, buildings: [] });
      regionGroups.get(key).buildings.push(building);
    }
    const regions = [...regionGroups.values()].map((region) => {
      const vehicleTypes = new Set(region.buildings.flatMap((building) => building.vehicles.map((vehicle) => String(vehicle.typeId))));
      const buildingTypes = new Set(region.buildings.map((building) => String(building.building_type)));
      const vehicles = region.buildings.flatMap((building) => building.vehicles);
      const personnel = region.buildings.reduce((sum, building) => sum + Number(building.summary.personnel || 0), 0);
      const targetCrew = region.buildings.reduce((sum, building) => sum + Number(building.summary.targetCrew || 0), 0);
      const missingCrew = vehicles.reduce((sum, vehicle) => sum + Number(vehicle.missingCrew || 0), 0);
      const missingTraining = vehicles.reduce((sum, vehicle) => sum + Number(vehicle.missingTraining || 0), 0);
      const inactive = region.buildings.filter((building) => building.enabled === false).length;
      const readiness = readinessScore({ targetCrew, missingCrew, missingTraining, buildings: region.buildings.length, inactive });
      return {
        ...region,
        vehicles,
        personnel,
        targetCrew,
        missingCrew,
        missingTraining,
        inactive,
        readiness,
        districts: [...new Set(region.buildings.map((building) => building.district).filter(Boolean))].sort((a, b) => a.localeCompare(b, "de")),
        federalStates: [...new Set(region.buildings.map((building) => building.federalState).filter(Boolean))].sort((a, b) => a.localeCompare(b, "de")),
        missingVehicleTypes: [...referenceVehicleTypes].filter(([id]) => !vehicleTypes.has(id)).map(([, caption]) => caption),
        missingBuildingTypes: [...referenceBuildingTypes].filter(([id]) => !buildingTypes.has(id)).map(([, caption]) => caption),
      };
    }).sort((a, b) => a.caption.localeCompare(b.caption, "de", { numeric: true }));
    const extensions = stationBuildings.flatMap((building) => normalizeBuildingExtensions(building));
    const personnelRows = operationalBuildings.map((building) => {
      const targetCrew = Number(building.summary.targetCrew || 0);
      const personnel = Number(building.summary.personnel || 0);
      const assigned = Number(building.summary.assigned || 0);
      const scan = state.personnelScans[String(building.id)] || null;
      const requiredQualifications = {};
      for (const vehicle of building.vehicles) for (const training of vehicle.training) requiredQualifications[training.key] = (requiredQualifications[training.key] || 0) + training.required;
      const qualificationBalance = Object.keys({ ...requiredQualifications, ...(scan?.counts || {}) }).map((key) => {
        const required = Number(requiredQualifications[key] || 0);
        const available = Number(scan?.counts?.[key] || 0);
        return { key, required, available, difference: available - required, names: scan?.names?.[key] || [] };
      });
      const scannedTrainingGap = qualificationBalance.reduce((sum, entry) => sum + Math.max(0, -entry.difference), 0);
      return {
        ...building,
        personnel,
        targetCrew,
        assigned,
        unassigned: Math.max(0, personnel - assigned),
        reserve: Math.max(0, personnel - targetCrew),
        shortage: Math.max(0, targetCrew - personnel),
        assignmentGap: Number(building.summary.missingCrew || 0),
        trainingGap: scan ? scannedTrainingGap : Number(building.summary.missingTraining || 0),
        personnelScan: scan,
        qualificationBalance,
      };
    });
    const transferSuggestions = suggestPersonnelTransfers(personnelRows);
    const modelBuildingById = new Map(buildings.map((building) => [building.id, building]));
    const utilizationRows = state.analyzed.map((vehicle) => {
      const distance = distanceByVehicle.get(vehicle.id) || {};
      const building = modelBuildingById.get(vehicle.buildingId);
      return { ...vehicle, district: building?.district || "", dispatchCenterCaption: building?.dispatchCenterCaption || "Ohne Leitstelle", distanceTotal: Number(distance.distance_km || 0), distance30d: Number(distance.distance_km_30d || 0) };
    });
    const averages = new Map();
    const globalAverage30d = utilizationRows.reduce((sum, vehicle) => sum + vehicle.distance30d, 0) / Math.max(1, utilizationRows.length);
    for (const vehicle of utilizationRows) {
      const value = averages.get(vehicle.typeId) || { sum: 0, count: 0 };
      value.sum += vehicle.distance30d;
      value.count += 1;
      averages.set(vehicle.typeId, value);
    }
    for (const vehicle of utilizationRows) {
      const typeValues = averages.get(vehicle.typeId) || { sum: 0, count: 0 };
      const average = typeValues.count > 1 ? typeValues.sum / typeValues.count : globalAverage30d;
      vehicle.typeAverage30d = average;
      vehicle.utilization = average <= 0 ? "unknown" : vehicle.distance30d > average * 1.5 ? "high" : vehicle.distance30d < average * .35 ? "low" : "normal";
    }
    const alerts = [];
    for (const building of operationalBuildings) {
      const missingCrew = Number(building.summary.missingCrew || 0);
      const missingTraining = Number(building.summary.missingTraining || 0);
      if (building.enabled === false) alerts.push({ priority: 3, title: building.caption, detail: "Wache ist inaktiv", tab: "buildings" });
      if (missingCrew) alerts.push({ priority: 4, title: building.caption, detail: `${missingCrew} Personen fehlen auf Fahrzeugen`, tab: "personnel" });
      if (missingTraining) alerts.push({ priority: 4, title: building.caption, detail: `${missingTraining} benötigte Ausbildungen fehlen`, tab: "training" });
    }
    const runningExtensions = extensions.filter((entry) => entry.status === "building");
    const inactiveExtensions = extensions.filter((entry) => entry.status === "inactive");
    if (runningExtensions.length) alerts.push({ priority: 1, title: "Laufende Ausbauten", detail: `${runningExtensions.length} Ausbauten befinden sich im Bau`, tab: "extensions" });
    if (inactiveExtensions.length) alerts.push({ priority: 2, title: "Fertige Ausbauten", detail: `${inactiveExtensions.length} Ausbauten sind fertig, aber inaktiv`, tab: "extensions" });
    return { buildings, stationBuildings, operationalBuildings, dispatchCenters, regions, extensions, personnelRows, transferSuggestions, utilizationRows, alerts: alerts.sort((a, b) => b.priority - a.priority || a.title.localeCompare(b.title, "de")) };
  }

  function normalizeBuildingExtensions(building) {
    const type = state.buildingTypes[String(building.building_type)] || {};
    const catalogRaw = type.extensions || type.extension || [];
    const catalog = Array.isArray(catalogRaw)
      ? catalogRaw
      : Object.entries(catalogRaw).map(([id, entry]) => typeof entry === "string" ? { id, caption: entry } : { id, ...entry });
    const owned = Array.isArray(building.extensions) ? building.extensions : [];
    const rows = owned.map((extension, index) => {
      const availableAt = extension.available_at ? new Date(extension.available_at) : null;
      const running = availableAt && !Number.isNaN(availableAt.valueOf()) && availableAt.valueOf() > Date.now();
      const status = running ? "building" : extension.enabled === false || extension.active === false ? "inactive" : "active";
      return {
        buildingId: building.id,
        buildingCaption: building.caption,
        buildingType: building.typeCaption,
        dispatchCenterCaption: building.dispatchCenterCaption,
        district: building.district,
        id: extension.type_id ?? extension.id ?? index,
        caption: extension.caption || extension.name || catalog.find((entry) => String(entry.id ?? entry.type_id) === String(extension.type_id ?? extension.id))?.caption || `Ausbau ${extension.type_id ?? extension.id ?? index + 1}`,
        status,
        availableAt: running ? availableAt : null,
      };
    });
    const ownedIds = new Set(owned.map((extension) => String(extension.type_id ?? extension.id)));
    for (const [index, extension] of catalog.entries()) {
      const id = extension.type_id ?? extension.id ?? index;
      if (ownedIds.has(String(id))) continue;
      rows.push({ buildingId: building.id, buildingCaption: building.caption, buildingType: building.typeCaption, dispatchCenterCaption: building.dispatchCenterCaption, district: building.district, id, caption: extension.caption || extension.name || `Ausbau ${id}`, status: "missing", availableAt: null });
    }
    return rows;
  }

  function readinessScore({ targetCrew, missingCrew, missingTraining, buildings, inactive }) {
    if (!buildings || inactive >= buildings) return 0;
    const crewPenalty = targetCrew ? Math.min(55, missingCrew / targetCrew * 100) : 0;
    const trainingPenalty = targetCrew ? Math.min(25, missingTraining / targetCrew * 80) : 0;
    const inactivePenalty = Math.min(20, inactive / buildings * 35);
    return Math.max(0, Math.round(100 - crewPenalty - trainingPenalty - inactivePenalty));
  }

  function readinessTone(score) {
    return score >= 90 ? "ok" : score >= 70 ? "warn" : score > 0 ? "danger" : "neutral";
  }

  function suggestPersonnelTransfers(rows) {
    const donors = rows.filter((row) => row.reserve > 0).map((row) => ({ ...row, availableReserve: row.reserve }));
    const suggestions = rows.filter((row) => row.assignmentGap > 0 && row.unassigned > 0).map((row) => ({ kind: "assign", to: row, amount: Math.min(row.assignmentGap, row.unassigned), sameDispatch: true }));
    for (const target of rows.filter((row) => row.shortage > 0).sort((a, b) => b.shortage - a.shortage)) {
      let remaining = target.shortage;
      const ordered = donors.slice().sort((a, b) => Number(b.dispatchCenterId === target.dispatchCenterId) - Number(a.dispatchCenterId === target.dispatchCenterId) || b.availableReserve - a.availableReserve);
      for (const donor of ordered) {
        if (!remaining || donor.availableReserve <= 0 || donor.id === target.id) continue;
        const amount = Math.min(remaining, donor.availableReserve);
        donor.availableReserve -= amount;
        const original = donors.find((entry) => entry.id === donor.id);
        if (original) original.availableReserve = donor.availableReserve;
        remaining -= amount;
        suggestions.push({ kind: "transfer", from: donor, to: target, amount, sameDispatch: donor.dispatchCenterId === target.dispatchCenterId });
      }
    }
    for (const target of rows) {
      for (const deficit of target.qualificationBalance.filter((entry) => entry.difference < 0)) {
        const donor = rows.filter((row) => row.id !== target.id).map((row) => ({ row, balance: row.qualificationBalance.find((entry) => entry.key === deficit.key) })).filter((entry) => entry.balance?.difference > 0).sort((a, b) => Number(b.row.dispatchCenterId === target.dispatchCenterId) - Number(a.row.dispatchCenterId === target.dispatchCenterId) || b.balance.difference - a.balance.difference)[0];
        if (!donor) continue;
        suggestions.push({ kind: "qualification", from: donor.row, to: target, amount: Math.min(-deficit.difference, donor.balance.difference), qualification: trainingName(deficit.key), sameDispatch: donor.row.dispatchCenterId === target.dispatchCenterId });
      }
    }
    return suggestions;
  }

  function renderDashboard(content) {
    const model = state.operationalModel;
    if (!model) return;
    const criticalRegions = model.regions.slice().sort((a, b) => a.readiness - b.readiness).slice(0, 5);
    const lowVehicles = model.utilizationRows.filter((vehicle) => vehicle.utilization === "low").length;
    const runningExtensions = model.extensions.filter((entry) => entry.status === "building").length;
    const inactiveExtensions = model.extensions.filter((entry) => entry.status === "inactive").length;
    const unassignedBuildings = model.operationalBuildings.filter((building) => building.dispatchCenterId === null).length;
    const cards = [
      ["Einsatzbereitschaft", `${Math.round(model.regions.reduce((sum, region) => sum + region.readiness, 0) / Math.max(1, model.regions.length))}%`, "Gebiete", "regions", "region"],
      ["Ohne Leitstelle", unassignedBuildings, "Wachen", "regions", "building"],
      ["Personalengpässe", model.personnelRows.filter((row) => row.shortage > 0 || row.assignmentGap > 0).length, "Wachen", "personnel", "users"],
      ["Ausbauten", `${runningExtensions} / ${inactiveExtensions}`, "im Bau / inaktiv", "extensions", "extension"],
      ["Wenig ausgelastet", lowVehicles, "Fahrzeuge", "utilization", "gauge"],
      ["Lehrgänge", state.schoolings.length, "laufend", "courses", "calendar"],
    ].map(([label, value, hint, tab, iconName]) => `<button type="button" class="lssfo-dashboard-card" data-tab="${tab}"><i>${icon(iconName)}</i><span>${escapeHtml(label)}</span><strong>${escapeHtml(value)}</strong><small>${escapeHtml(hint)}</small></button>`).join("");
    const alerts = model.alerts.slice(0, 10).map((alert) => `<button type="button" class="lssfo-alert-row priority-${alert.priority}" data-tab="${alert.tab}"><span><strong>${escapeHtml(alert.title)}</strong><small>${escapeHtml(alert.detail)}</small></span>${icon("chevron")}</button>`).join("") || '<div class="lssfo-empty lssfo-empty-small">Keine kritischen Hinweise.</div>';
    const regions = criticalRegions.map((region) => `<button type="button" class="lssfo-readiness-row" data-tab="regions"><span><strong>${escapeHtml(region.caption)}</strong><small>${region.buildings.length} Wachen · ${region.missingCrew} Personal fehlt</small></span><b class="${readinessTone(region.readiness)}">${region.readiness}%</b></button>`).join("");
    content.innerHTML = `<div class="lssfo-dashboard-grid">${cards}</div><div class="lssfo-dashboard-columns"><section class="lssfo-dashboard-panel"><div class="lssfo-section-heading"><div><h3>Handlungsbedarf</h3><p>Die wichtigsten offenen Punkte aus allen Bereichen</p></div></div>${alerts}</section><section class="lssfo-dashboard-panel"><div class="lssfo-section-heading"><div><h3>Kritischste Gebiete</h3><p>Bereitschaft aus Personal, Ausbildung und Aktivstatus</p></div></div>${regions || '<div class="lssfo-empty lssfo-empty-small">Keine Gebiete erkannt.</div>'}</section></div>`;
  }

  function renderRegions(content) {
    const model = state.operationalModel;
    const rows = model.regions.filter((region) => (!state.onlyMissing || region.readiness < 90) && matchesQuery(region.caption, ...region.districts, ...region.federalStates));
    const note = `<div class="lssfo-callout"><strong>Kontostandard</strong><span>Fehlende Wachen- und Fahrzeugtypen werden mit den Typen verglichen, die in deinen übrigen Leitstellengebieten bereits vorhanden sind.</span></div>`;
    content.innerHTML = note + table(["Leitstelle / Gebiet", "Bundesland", "Bezirke", "Wachen", "Fahrzeuge", "Personal", "Fehlbedarf", "Bereitschaft", "Lücken"], rows.map((region) => [
      `${region.key === "none" ? badge("ohne Zuordnung", "danger") : `<a href="/buildings/${region.key}" target="_blank" rel="noopener">${escapeHtml(region.caption)}</a>`}`,
      escapeHtml(region.federalStates.join(", ") || "–"),
      escapeHtml(region.districts.join(", ") || "–"),
      region.buildings.length,
      region.vehicles.length,
      `${region.personnel} / ${region.targetCrew}`,
      `${region.missingCrew ? badge(`${region.missingCrew} Pers.`, "danger") : badge("0 Pers.", "ok")} ${region.missingTraining ? badge(`${region.missingTraining} Ausb.`, "warn") : ""}`,
      `<span class="lssfo-readiness-badge ${readinessTone(region.readiness)}">${region.readiness}%</span>`,
      `<small>${formatMissingList("Fahrzeuge", region.missingVehicleTypes)}${formatMissingList("Wachen", region.missingBuildingTypes)}</small>`,
    ]), rows.length, "regions");
  }

  function formatMissingList(label, values) {
    if (!values.length) return `<span class="lssfo-plan-complete">${label}: vollständig</span><br>`;
    const visible = values.slice(0, 5).join(", ");
    return `<span><b>${label}:</b> ${escapeHtml(visible)}${values.length > 5 ? ` +${values.length - 5}` : ""}</span><br>`;
  }

  function renderExtensions(content) {
    const statusMatches = (entry) => {
      if (state.extensionStatus === "owned") return entry.status !== "missing";
      if (state.extensionStatus === "attention") return entry.status === "building" || entry.status === "inactive";
      if (state.extensionStatus === "all") return true;
      return entry.status === state.extensionStatus;
    };
    const rows = state.operationalModel.extensions.filter((entry) => statusMatches(entry)
      && (!state.onlyMissing || entry.status !== "active")
      && matchesQuery(entry.caption, entry.buildingCaption, entry.buildingType, entry.dispatchCenterCaption, entry.district));
    const visibleRows = Number.isFinite(state.extensionLimit) ? rows.slice(0, state.extensionLimit) : rows;
    const limitValue = Number.isFinite(state.extensionLimit) ? String(state.extensionLimit) : "all";
    const controls = `<div class="lssfo-content-actions lssfo-extension-actions"><div><strong>Ausbauverwaltung</strong><span>Standardmäßig werden nur vorhandene Ausbauten geladen. Katalogmöglichkeiten können bei Bedarf eingeblendet werden.</span></div><div class="lssfo-extension-controls"><label>Status<select id="lssfo-extension-status"><option value="owned"${state.extensionStatus === "owned" ? " selected" : ""}>Vorhanden</option><option value="attention"${state.extensionStatus === "attention" ? " selected" : ""}>Handlungsbedarf</option><option value="active"${state.extensionStatus === "active" ? " selected" : ""}>Aktiv</option><option value="building"${state.extensionStatus === "building" ? " selected" : ""}>Im Bau</option><option value="inactive"${state.extensionStatus === "inactive" ? " selected" : ""}>Fertig, inaktiv</option><option value="missing"${state.extensionStatus === "missing" ? " selected" : ""}>Katalog: noch möglich</option><option value="all"${state.extensionStatus === "all" ? " selected" : ""}>Alle Status</option></select></label><label>Maximal anzeigen<select id="lssfo-extension-limit"><option value="50"${limitValue === "50" ? " selected" : ""}>50</option><option value="100"${limitValue === "100" ? " selected" : ""}>100</option><option value="250"${limitValue === "250" ? " selected" : ""}>250</option><option value="500"${limitValue === "500" ? " selected" : ""}>500</option><option value="all"${limitValue === "all" ? " selected" : ""}>Alle</option></select></label></div></div>`;
    const limitNote = visibleRows.length < rows.length ? `<div class="lssfo-callout lssfo-limit-note"><strong>${formatNumber(visibleRows.length)} von ${formatNumber(rows.length)}</strong><span>Einträgen werden angezeigt. Grenze oben erhöhen oder Suche und Statusfilter verwenden.</span></div>` : "";
    content.innerHTML = controls + limitNote + table(["Wache", "Typ", "Leitstelle", "Bezirk", "Ausbau", "Status / Restzeit"], visibleRows.map((entry) => [
      `<a href="/buildings/${entry.buildingId}" target="_blank" rel="noopener">${escapeHtml(entry.buildingCaption)}</a>`,
      escapeHtml(entry.buildingType),
      escapeHtml(entry.dispatchCenterCaption),
      escapeHtml(entry.district || "–"),
      escapeHtml(entry.caption),
      extensionStatus(entry),
    ]), rows.length, "extensions");
  }

  function extensionStatus(entry) {
    if (entry.status === "building") return `${badge("im Bau", "warn")} <small>${escapeHtml(relativeTime(entry.availableAt))}</small>`;
    if (entry.status === "inactive") return badge("fertig, inaktiv", "danger");
    if (entry.status === "missing") return badge("fehlt", "warn");
    return badge("aktiv", "ok");
  }

  function relativeTime(date) {
    if (!(date instanceof Date) || Number.isNaN(date.valueOf())) return "–";
    const minutes = Math.max(0, Math.ceil((date.valueOf() - Date.now()) / 60000));
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    return days ? `noch ${days} T. ${hours} Std.` : `noch ${hours} Std. ${minutes % 60} Min.`;
  }

  function renderUtilization(content) {
    const rows = state.operationalModel.utilizationRows.filter((vehicle) => (!state.onlyMissing || vehicle.utilization === "low" || vehicle.utilization === "high") && matchesQuery(vehicle.caption, vehicle.typeCaption, vehicle.buildingCaption));
    const hasData = state.vehicleDistances.length > 0;
    const note = `<div class="lssfo-callout"><strong>${hasData ? "30-Tage-Auswertung" : "Keine Kilometerdaten"}</strong><span>${hasData ? "Niedrig und hoch werden relativ zum Durchschnitt desselben Fahrzeugtyps bewertet; bei Einzeltypen dient der Gesamtdurchschnitt als Referenz." : "Der offizielle Endpunkt /api/v1/vehicle_distances.json hat keine Werte geliefert."}</span></div>`;
    const topStation = topUtilizationGroup(state.operationalModel.utilizationRows, (vehicle) => vehicle.buildingCaption);
    const topType = topUtilizationGroup(state.operationalModel.utilizationRows, (vehicle) => vehicle.typeCaption);
    const topDistrict = topUtilizationGroup(state.operationalModel.utilizationRows, (vehicle) => vehicle.district || "Ohne Bezirk");
    const summary = `<div class="lssfo-utilization-summary"><article><span>Stärkste Wache</span><strong>${escapeHtml(topStation.caption)}</strong><small>${formatDecimal(topStation.distance)} km / 30 Tage</small></article><article><span>Stärkster Fahrzeugtyp</span><strong>${escapeHtml(topType.caption)}</strong><small>${formatDecimal(topType.distance)} km / 30 Tage</small></article><article><span>Stärkster Bezirk</span><strong>${escapeHtml(topDistrict.caption)}</strong><small>${formatDecimal(topDistrict.distance)} km / 30 Tage</small></article></div>`;
    content.innerHTML = note + summary + table(["Fahrzeug", "Typ", "Wache", "Bezirk", "Gesamt-km", "30 Tage", "Typdurchschnitt", "Bewertung", "Empfehlung"], rows.map((vehicle) => {
      const recommendation = vehicle.utilization === "low" ? "Standort oder Vorhaltung prüfen" : vehicle.utilization === "high" ? "Entlastungsfahrzeug prüfen" : "passende Auslastung";
      return [
        `<a href="/vehicles/${vehicle.id}" target="_blank" rel="noopener">${escapeHtml(vehicle.caption)}</a>`,
        escapeHtml(vehicle.typeCaption),
        escapeHtml(vehicle.buildingCaption),
        escapeHtml(vehicle.district || "–"),
        formatDecimal(vehicle.distanceTotal),
        formatDecimal(vehicle.distance30d),
        formatDecimal(vehicle.typeAverage30d),
        vehicle.utilization === "low" ? badge("niedrig", "warn") : vehicle.utilization === "high" ? badge("hoch", "danger") : vehicle.utilization === "normal" ? badge("normal", "ok") : badge("keine Daten", "neutral"),
        escapeHtml(recommendation),
      ];
    }), rows.length, "utilization");
  }

  function topUtilizationGroup(rows, keyFunction) {
    const groups = new Map();
    for (const row of rows) {
      const caption = keyFunction(row);
      groups.set(caption, (groups.get(caption) || 0) + row.distance30d);
    }
    const [caption = "–", distance = 0] = [...groups].sort((a, b) => b[1] - a[1])[0] || [];
    return { caption, distance };
  }

  function renderPersonnelPlanning(content) {
    const model = state.operationalModel;
    const rows = model.personnelRows.filter((row) => (!state.onlyMissing || row.shortage || row.assignmentGap || row.trainingGap) && matchesQuery(row.caption, row.typeCaption, row.dispatchCenterCaption, row.district));
    const suggestions = model.transferSuggestions.slice(0, 12).map((suggestion) => `<article class="lssfo-transfer-card"><span>${icon("transfer")}</span><div><strong>${suggestion.kind === "assign" ? `${suggestion.amount} freie Person${suggestion.amount === 1 ? "" : "en"} Fahrzeugen zuweisen` : suggestion.kind === "qualification" ? `${suggestion.amount}× ${escapeHtml(suggestion.qualification)} verschieben` : `${suggestion.amount} Person${suggestion.amount === 1 ? "" : "en"} verschieben`}</strong><small>${suggestion.kind === "assign" ? `${escapeHtml(suggestion.to.caption)} · Personal ist bereits an der Wache vorhanden` : `${escapeHtml(suggestion.from.caption)} → ${escapeHtml(suggestion.to.caption)}${suggestion.sameDispatch ? " · gleiche Leitstelle" : " · leitstellenübergreifend"}`}</small></div><a class="lssfo-btn lssfo-btn-small" href="/buildings/${suggestion.to.id}/personals" target="_blank" rel="noopener">Personal</a></article>`).join("");
    const scanned = Object.keys(state.personnelScans).length;
    const planner = `<div class="lssfo-personnel-planner"><div class="lssfo-section-heading"><div><h3>Verschiebevorschläge</h3><p>Reserve wird zuerst innerhalb derselben Leitstelle verteilt; nach der Detailprüfung werden auch Ausbildungsüberschüsse berücksichtigt.</p></div><button type="button" class="lssfo-btn" data-action="scan-personnel">${state.personnelScanController ? `${icon("stop")} Prüfung stoppen` : `${icon("scan")} Personal detailliert prüfen`}</button></div>${scanned ? `<div class="lssfo-personnel-scan-note">${scanned} Wachen mit Namen, Verfügbarkeit und Ausbildungen geprüft.</div>` : ""}${suggestions || '<div class="lssfo-empty lssfo-empty-small">Keine sinnvolle Verschiebung aus den aktuellen Sollwerten ableitbar.</div>'}</div>`;
    content.innerHTML = planner + table(["Wache", "Typ", "Leitstelle", "Personal", "Fahrzeug-Soll", "Nicht zugewiesen", "Reserve", "Personal fehlt", "Zuweisung fehlt", "Ausbildungsbilanz"], rows.map((row) => [
      `<a href="/buildings/${row.id}" target="_blank" rel="noopener">${escapeHtml(row.caption)}</a>`,
      escapeHtml(row.typeCaption),
      escapeHtml(row.dispatchCenterCaption),
      `<a href="/buildings/${row.id}/personals" target="_blank" rel="noopener" title="Personal der Wache öffnen">${formatNumber(row.personnel)}</a>`,
      row.targetCrew,
      row.unassigned,
      row.reserve ? badge(row.reserve, "ok") : "0",
      row.shortage ? badge(row.shortage, "danger") : badge("0", "ok"),
      row.assignmentGap ? badge(row.assignmentGap, "danger") : badge("0", "ok"),
      renderQualificationBalance(row),
    ]), rows.length, "personnel-planning");
  }

  function renderQualificationBalance(row) {
    if (!row.personnelScan) return row.trainingGap ? badge(`${row.trainingGap} fehlt`, "warn") : '<span class="lssfo-muted">Detailprüfung offen</span>';
    if (!row.qualificationBalance.length) return badge("keine Anforderungen", "neutral");
    return row.qualificationBalance.map((entry) => {
      const tone = entry.difference < 0 ? "danger" : entry.difference > 0 ? "warn" : "ok";
      const suffix = entry.difference < 0 ? `${-entry.difference} fehlt` : entry.difference > 0 ? `${entry.difference} Reserve` : "passend";
      const title = entry.names.length ? ` title="${escapeHtml(entry.names.join(", "))}"` : "";
      return `<span class="lssfo-badge ${tone}"${title}>${escapeHtml(trainingName(entry.key))}: ${entry.available}/${entry.required} · ${suffix}</span>`;
    }).join(" ");
  }

  function formatDecimal(value) {
    return decimalFormat.format(Number(value || 0));
  }

  /* ---------- Fahrzeug umrüsten (Seite „Fahrzeug umrüsten“ des Spiels) ---------- */

  // Sucht auf der Fahrzeugseite den Link „Umrüsten“. Ohne Link ist keine Umrüstung möglich.
  async function findRefitUrl(id) {
    const doc = new DOMParser().parseFromString(await fetchPage(`/vehicles/${id}`), "text/html");
    const link = [...doc.querySelectorAll("a[href]")].find((anchor) => /umrüst/i.test(`${anchor.textContent} ${anchor.title}`)
      || new RegExp(`/vehicles/${id}/(?:umruest|refit|upgrade|conversion)`, "i").test(anchor.getAttribute("href") || ""));
    return link ? new URL(link.getAttribute("href"), location.origin).pathname + new URL(link.getAttribute("href"), location.origin).search : null;
  }

  // Liest das Umrüst-Formular allgemein: Vorlage, Zahlenfelder (mit Grenzen) und den Credits-Knopf.
  function parseRefitForm(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const submits = [...doc.querySelectorAll('button, input[type="submit"]')];
    const creditButton = submits.find((button) => /credits/i.test(button.textContent || button.value || ""));
    const form = creditButton?.closest("form") || creditButton?.form || [...doc.querySelectorAll("form")].find((entry) => /umrüst/i.test(entry.textContent)) || null;
    if (!form) throw new Error("Umrüst-Formular nicht gefunden");
    const textOf = (element) => (element?.textContent || "").replace(/\s+/g, " ").trim();
    const preset = form.querySelector("select");
    const inputs = [...form.querySelectorAll("input")].filter((input) => !["hidden", "submit", "button", "checkbox", "radio", "range"].includes((input.type || "text").toLowerCase()));
    const fields = inputs.map((input, index) => {
      const block = input.closest(".form-group") || input.closest(".row")?.parentElement || input.parentElement;
      const heading = block?.querySelector("label, strong, b, h4, h5") || null;
      const range = block?.querySelector('input[type="range"], [data-slider-min], [data-min]');
      const number = (...values) => values.map((value) => (value === null || value === undefined || value === "" ? NaN : Number(value))).find(Number.isFinite);
      return {
        key: input.name || input.id || `field-${index}`,
        label: textOf(heading) || input.name || `Wert ${index + 1}`,
        hint: textOf(block?.querySelector("p, .help-block, small")),
        value: input.value,
        min: number(input.min, range?.min, range?.dataset?.sliderMin, range?.dataset?.min),
        max: number(input.max, range?.max, range?.dataset?.sliderMax, range?.dataset?.max),
      };
    });
    return {
      form,
      info: textOf(doc.querySelector(".alert-info, .alert")),
      preset: preset ? { label: textOf(preset.closest(".input-group, .form-group")?.querySelector(".input-group-addon, label")) || "Umrüstung", value: preset.value, options: [...preset.options].map((option) => ({ value: option.value, label: textOf(option), data: { ...option.dataset } })) } : null,
      fields,
      creditLabel: textOf(creditButton) || creditButton?.value || "Mit Credits umrüsten",
      creditName: creditButton?.name || "",
      creditValue: creditButton?.value || "",
      creditAction: creditButton?.getAttribute("formaction") || "",
    };
  }

  async function openRefit(id) {
    const vehicle = state.analyzed.find((entry) => entry.id === id);
    const url = state.vehicleEditOptions[id]?.refitUrl;
    if (!url) return;
    state.refit = { id, caption: vehicle?.caption || `Fahrzeug ${id}`, url, loading: true, values: {}, confirming: false };
    renderRefit();
    try {
      const parsed = parseRefitForm(await fetchPage(url));
      Object.assign(state.refit, parsed, { loading: false, preset: parsed.preset, values: Object.fromEntries(parsed.fields.map((field) => [field.key, field.value])) });
      if (parsed.preset) state.refit.values.__preset = parsed.preset.value;
    } catch (error) {
      Object.assign(state.refit, { loading: false, error: error.message });
    }
    renderRefit();
  }

  function closeRefit() {
    state.refit = null;
    const element = shell.querySelector("#lssfo-refit");
    if (element) {
      element.hidden = true;
      element.innerHTML = "";
    }
  }

  // Vorlage gewählt: Werte übernehmen, wenn das Spiel sie an der Option mitliefert (data-Attribute).
  function applyRefitPreset(value) {
    const refit = state.refit;
    if (!refit?.preset) return;
    refit.values.__preset = value;
    refit.confirming = false;
    const option = refit.preset.options.find((entry) => entry.value === value);
    for (const field of refit.fields) {
      const short = field.key.replace(/^.*\[|\]$/g, "");
      const candidates = Object.entries(option?.data || {}).filter(([key]) => key.toLowerCase().includes(short.toLowerCase().replace(/_/g, "")));
      if (candidates.length) refit.values[field.key] = String(candidates[0][1]);
      else if (/^max/i.test(value) && Number.isFinite(field.max)) refit.values[field.key] = String(field.max);
    }
    renderRefit();
  }

  function renderRefit() {
    const element = shell.querySelector("#lssfo-refit");
    const refit = state.refit;
    if (!refit) {
      element.hidden = true;
      return;
    }
    element.hidden = false;
    let body;
    if (refit.loading) body = '<div class="lssfo-empty">Umrüst-Möglichkeiten werden geladen …</div>';
    else if (refit.error) body = `<div class="lssfo-empty">Die Umrüstung konnte nicht geladen werden: ${escapeHtml(refit.error)}</div>`;
    else if (refit.done) body = `<div class="lssfo-empty">${badge("Umrüstung gestartet", "ok")}<p>${escapeHtml(refit.caption)} wird umgerüstet und steht während der Umrüstung nicht zur Verfügung.</p></div>`;
    else {
      const preset = refit.preset ? `<label class="lssfo-refit-preset">${escapeHtml(refit.preset.label)}<select id="lssfo-refit-preset">${refit.preset.options.map((option) => `<option value="${escapeHtml(option.value)}"${option.value === refit.values.__preset ? " selected" : ""}>${escapeHtml(option.label)}</option>`).join("")}</select></label>` : "";
      const fields = refit.fields.map((field) => `<label class="lssfo-refit-field"><strong>${escapeHtml(field.label)}</strong>${field.hint ? `<small>${escapeHtml(field.hint)}</small>` : ""}<span><input type="number" data-refit-field="${escapeHtml(field.key)}" value="${escapeHtml(refit.values[field.key] ?? "")}"${Number.isFinite(field.min) ? ` min="${field.min}"` : ""}${Number.isFinite(field.max) ? ` max="${field.max}"` : ""}>${Number.isFinite(field.min) && Number.isFinite(field.max) ? `<em>${formatNumber(field.min)} – ${formatNumber(field.max)}</em>` : ""}</span></label>`).join("");
      body = `${refit.info ? `<div class="lssfo-callout"><span>${escapeHtml(refit.info)}</span></div>` : ""}${preset}<div class="lssfo-refit-grid">${fields || '<div class="lssfo-empty lssfo-empty-small">Für dieses Fahrzeug gibt es keine einstellbaren Werte.</div>'}</div>`;
    }
    element.innerHTML = `<div class="lssfo-manager-backdrop" data-action="refit-close"></div>
      <aside class="lssfo-course-card lssfo-refit-card" role="dialog" aria-modal="true" aria-label="Fahrzeug umrüsten">
        <header class="lssfo-manager-header"><div><span>FAHRZEUG UMRÜSTEN</span><h2>${escapeHtml(refit.caption)}</h2></div><button type="button" class="lssfo-icon-btn" data-action="refit-close" aria-label="Schließen">${icon("close")}</button></header>
        <div class="lssfo-refit-body">${body}</div>
        <footer class="lssfo-refit-footer" id="lssfo-refit-footer"></footer>
      </aside>`;
    updateRefitFooter();
  }

  function updateRefitFooter() {
    const footer = shell.querySelector("#lssfo-refit-footer");
    const refit = state.refit;
    if (!footer || !refit) return;
    if (refit.loading || refit.error || refit.done) {
      footer.innerHTML = `<button type="button" class="lssfo-btn" data-action="refit-close">Schließen</button>`;
      return;
    }
    const invalid = refit.fields.find((field) => {
      const value = Number(refit.values[field.key]);
      return !Number.isFinite(value) || (Number.isFinite(field.min) && value < field.min) || (Number.isFinite(field.max) && value > field.max);
    });
    const message = invalid ? `„${escapeHtml(invalid.label)}“ liegt außerhalb des erlaubten Bereichs.`
      : refit.confirming ? `<strong>Wirklich umrüsten?</strong> Bezahlt wird mit Credits (${escapeHtml(refit.creditLabel.replace(/^.*\(|\).*$/g, ""))} laut Spiel für die Ausgangswerte – bei geänderten Werten berechnet das Spiel den Preis neu). Das Fahrzeug steht während der Umrüstung nicht zur Verfügung.`
        : "Coins werden nie verwendet. Erst nach Bestätigung wird umgerüstet.";
    footer.innerHTML = `<span class="lssfo-refit-note">${refit.submitting ? "Wird an das Spiel übertragen …" : message}</span>
      <button type="button" class="lssfo-btn" data-action="refit-close">Abbrechen</button>
      ${refit.confirming
        ? `<button type="button" class="lssfo-btn lssfo-btn-primary" data-action="refit-submit"${invalid || refit.submitting ? " disabled" : ""}>Ja, mit Credits umrüsten</button>`
        : `<button type="button" class="lssfo-btn lssfo-btn-primary" data-action="refit-confirm"${invalid ? " disabled" : ""}>${escapeHtml(refit.creditLabel)}</button>`}`;
  }

  function confirmRefit() {
    if (!state.refit) return;
    state.refit.confirming = true;
    updateRefitFooter();
  }

  async function submitRefit() {
    const refit = state.refit;
    if (!refit?.form || refit.submitting) return;
    refit.submitting = true;
    updateRefitFooter();
    try {
      const form = refit.form;
      if (refit.preset && refit.values.__preset !== undefined) form.querySelector("select").value = refit.values.__preset;
      for (const field of refit.fields) {
        const input = form.querySelector(`[name="${CSS.escape(field.key)}"], #${CSS.escape(field.key)}`);
        if (input) input.value = refit.values[field.key];
        // Zugehörige Schieberegler im selben Block mitziehen, falls das Spiel deren Wert ausliest.
        const slider = input?.closest(".form-group, div")?.querySelector('input[type="range"]');
        if (slider) slider.value = refit.values[field.key];
      }
      if (refit.creditAction) form.setAttribute("action", refit.creditAction);
      const response = await submitParsedForm(form, refit.creditName ? [[refit.creditName, refit.creditValue]] : []);
      const answer = new DOMParser().parseFromString(await response.text().catch(() => ""), "text/html");
      const problem = answer.querySelector(".alert-danger");
      if (problem && /credit|nicht genug|fehler|ungültig/i.test(problem.textContent)) throw new Error(problem.textContent.replace(/\s+/g, " ").trim().slice(0, 200));
      state.refitStarted[refit.id] = true;
      refit.done = true;
      refit.submitting = false;
      renderRefit();
      if (state.tab === "edit") renderContent();
    } catch (error) {
      refit.submitting = false;
      refit.confirming = false;
      refit.info = `Umrüstung fehlgeschlagen: ${error.message}`;
      renderRefit();
    }
  }

  /* ---------- Fahrzeuge bearbeiten: Name, Besatzung, Umbau – ohne Neuladen ---------- */

  function editableVehicles() {
    return state.analyzed.filter((vehicle) => (state.vehicleEditBuilding === "all" || String(vehicle.buildingId) === state.vehicleEditBuilding)
      && matchesQuery(vehicle.caption, vehicle.typeCaption, vehicle.buildingCaption, state.vehicleEdits[vehicle.id]?.caption));
  }

  function vehicleRaw(id) {
    return state.vehicles.find((vehicle) => Number(vehicle.id) === Number(id));
  }

  function originalVehicleValue(id, field) {
    const raw = vehicleRaw(id) || {};
    if (field === "caption") return String(raw.caption ?? "");
    if (field === "max") return String(Number(raw.max_personnel_override) > 0 ? Number(raw.max_personnel_override) : 0);
    return String(raw.vehicle_type ?? "");
  }

  function setVehicleEdit(id, field, value) {
    const edits = state.vehicleEdits[id] || {};
    if (String(value) === originalVehicleValue(id, field) || (field === "caption" && !String(value).trim())) delete edits[field];
    else edits[field] = String(value);
    if (Object.keys(edits).length) state.vehicleEdits[id] = edits;
    else delete state.vehicleEdits[id];
    delete state.vehicleEditStatus[id];
    const input = shell.querySelector(`[data-edit-id="${id}"][data-edit-field="${field}"]`);
    input?.classList.toggle("is-changed", field in edits);
    const status = shell.querySelector(`[data-edit-status="${id}"]`);
    if (status) status.innerHTML = vehicleEditStatus(id);
    updateVehicleEditBar();
  }

  function updateVehicleEditBar() {
    const count = Object.keys(state.vehicleEdits).length;
    const counter = shell.querySelector("#lssfo-edit-count");
    if (counter) counter.textContent = count ? `${formatNumber(count)} Fahrzeug${count === 1 ? "" : "e"} geändert` : "Keine offenen Änderungen";
    for (const button of shell.querySelectorAll('[data-action="edit-save-all"], [data-action="edit-discard"]')) button.disabled = !count || state.vehicleEditSaving;
    const tabCount = shell.querySelector('[data-tab-count="edit"]');
    if (tabCount) tabCount.textContent = formatNumber(count);
  }

  function vehicleEditStatus(id) {
    const status = state.vehicleEditStatus[id];
    if (status === "saving") return badge("speichert …", "neutral");
    if (status === "saved") return badge("gespeichert", "ok");
    if (status) return `<span class="lssfo-badge danger" title="${escapeHtml(status)}">Fehler</span>`;
    return state.vehicleEdits[id] ? badge("geändert", "warn") : "";
  }

  function renderVehicleEditor(content) {
    const rows = editableVehicles();
    const buildings = [...new Map(state.analyzed.map((vehicle) => [vehicle.buildingId, vehicle.buildingCaption])).entries()]
      .sort((a, b) => textCollator.compare(a[1], b[1]));
    const buildingOptions = buildings.map(([id, caption]) => `<option value="${id}"${String(id) === state.vehicleEditBuilding ? " selected" : ""}>${escapeHtml(caption)}</option>`).join("");
    const controls = `<div class="lssfo-editor-bar">
      <label>Wache<select id="lssfo-edit-building"><option value="all">Alle Wachen</option>${buildingOptions}</select></label>
      ${state.vehicleEditBuilding !== "all" ? `<button type="button" class="lssfo-btn" data-action="edit-load-building">Umbau prüfen (${formatNumber(rows.length)})</button>` : ""}
      <div class="lssfo-editor-replace"><label>Im Namen suchen<input id="lssfo-edit-find" type="text" placeholder="z. B. Florian"></label><label>ersetzen durch<input id="lssfo-edit-replace" type="text" placeholder="z. B. Florian NÖ"></label><button type="button" class="lssfo-btn" data-action="edit-replace">Bei ${formatNumber(rows.length)} ${rows.length === 1 ? "Fahrzeug" : "Fahrzeugen"} anwenden</button></div>
      <div class="lssfo-editor-save"><span id="lssfo-edit-count"></span><button type="button" class="lssfo-btn" data-action="edit-discard">Verwerfen</button><button type="button" class="lssfo-btn lssfo-btn-primary" data-action="edit-save-all">${state.vehicleEditSaving ? "Speichert …" : "Alle speichern"}</button></div>
    </div>
    <div class="lssfo-callout"><span>Änderungen werden erst mit „Alle speichern“ ins Spiel übernommen – im Hintergrund, ohne die Seite neu zu laden. „prüfen“ zeigt, ob sich ein Fahrzeug umrüsten lässt; Umrüstungen werden einzeln bestätigt und nur mit Credits bezahlt.</span></div>`;
    content.innerHTML = controls + table(["Wache", "Name", "Typ", "Max. Besatzung", "Umbau", "Status"], rows.map((vehicle) => {
      const edits = state.vehicleEdits[vehicle.id] || {};
      const caption = edits.caption ?? vehicle.caption;
      const maxValue = edits.max ?? originalVehicleValue(vehicle.id, "max");
      const maxOptions = [`<option value="0"${maxValue === "0" ? " selected" : ""}>Standard (${vehicle.staffMax})</option>`];
      for (let count = 1; count <= Math.max(vehicle.staffMax, Number(maxValue) || 0); count += 1) {
        maxOptions.push(`<option value="${count}"${String(count) === maxValue ? " selected" : ""}>${count}</option>`);
      }
      return [
        `<a href="/buildings/${vehicle.buildingId}" target="_blank" rel="noopener">${escapeHtml(vehicle.buildingCaption)}</a>`,
        `<input class="lssfo-inline-input${"caption" in edits ? " is-changed" : ""}" type="text" maxlength="40" data-edit-id="${vehicle.id}" data-edit-field="caption" value="${escapeHtml(caption)}" aria-label="Name von ${escapeHtml(vehicle.caption)}">`,
        escapeHtml(vehicle.typeCaption),
        `<select class="lssfo-inline-input${"max" in edits ? " is-changed" : ""}" data-edit-id="${vehicle.id}" data-edit-field="max" aria-label="Maximale Besatzung">${maxOptions.join("")}</select>`,
        renderUpgradeCell(vehicle, edits),
        `<span data-edit-status="${vehicle.id}">${vehicleEditStatus(vehicle.id)}</span>`,
      ];
    }), rows.length, "edit");
    updateVehicleEditBar();
  }

  function renderUpgradeCell(vehicle, edits) {
    const options = state.vehicleEditOptions[vehicle.id];
    if (!options) return `<span data-edit-id="${vehicle.id}"><button type="button" class="lssfo-btn lssfo-btn-small" data-action="edit-load-options">prüfen</button></span>`;
    if (options === "loading") return '<span class="lssfo-muted">lädt …</span>';
    if (options.error) return `<span class="lssfo-muted" title="${escapeHtml(options.error)}">nicht abrufbar</span>`;
    if (state.refitStarted[vehicle.id]) return badge("Umrüstung läuft", "warn");
    if (options.refitUrl) return `<span data-edit-id="${vehicle.id}"><button type="button" class="lssfo-btn lssfo-btn-small" data-action="refit-open">Umrüsten …</button></span>`;
    if (!options.types.length) return '<span class="lssfo-muted">kein Umbau</span>';
    const current = edits.type ?? originalVehicleValue(vehicle.id, "type");
    return `<select class="lssfo-inline-input${"type" in edits ? " is-changed" : ""}" data-edit-id="${vehicle.id}" data-edit-field="type" aria-label="Umbau">${options.types.map((option) => `<option value="${escapeHtml(option.value)}"${option.value === current ? " selected" : ""}>${escapeHtml(option.label)}</option>`).join("")}</select>`;
  }

  // Liest das Bearbeitungsformular des Spiels und findet ein Umbau-/Fahrzeugtyp-Auswahlfeld.
  function findUpgradeSelect(form) {
    const direct = form.querySelector('select[name="vehicle[vehicle_type]"], select[name*="vehicle_type"], select[name*="upgrade"]');
    if (direct) return direct;
    return [...form.querySelectorAll("select")].find((select) => {
      const label = select.id ? form.querySelector(`label[for="${CSS.escape(select.id)}"]`) : select.closest("label, .form-group")?.querySelector("label");
      return /fahrzeugtyp|umbau|upgrade|umrüst/i.test(`${label?.textContent || ""} ${select.name}`);
    }) || null;
  }

  async function fetchVehicleForm(id) {
    const doc = new DOMParser().parseFromString(await fetchPage(`/vehicles/${id}/edit`), "text/html");
    const nameInput = doc.querySelector('#vehicle_caption, input[name="vehicle[caption]"]');
    const form = nameInput?.closest("form");
    if (!form) throw new Error("Bearbeitungsformular nicht gefunden");
    return { form, nameInput, maxInput: form.querySelector('#vehicle_personal_max, [name="vehicle[personal_max]"], [name="vehicle[max_personnel_override]"]'), typeSelect: findUpgradeSelect(form) };
  }

  async function loadVehicleOptions(id, rerender = true) {
    state.vehicleEditOptions[id] = "loading";
    if (rerender) renderContent();
    try {
      const [{ typeSelect }, refitUrl] = await Promise.all([fetchVehicleForm(id), findRefitUrl(id).catch(() => null)]);
      const types = typeSelect ? [...typeSelect.options].filter((option) => option.value !== "").map((option) => ({ value: option.value, label: option.textContent.trim() })) : [];
      state.vehicleEditOptions[id] = { types: types.length > 1 ? types : [], refitUrl };
    } catch (error) {
      state.vehicleEditOptions[id] = { types: [], error: error.message };
    }
    if (rerender && state.tab === "edit") renderContent();
  }

  // Umbau-Möglichkeiten für alle Fahrzeuge der gewählten Wache auf einmal prüfen.
  async function loadBuildingOptions() {
    const ids = editableVehicles().map((vehicle) => vehicle.id).filter((id) => !state.vehicleEditOptions[id]);
    for (const id of ids) state.vehicleEditOptions[id] = "loading";
    renderContent();
    await runLimited(ids, 2, (id) => loadVehicleOptions(id, false));
    if (state.tab === "edit") renderContent();
  }

  function applyNameReplace() {
    const find = shell.querySelector("#lssfo-edit-find")?.value || "";
    const replacement = shell.querySelector("#lssfo-edit-replace")?.value ?? "";
    if (!find) return;
    let changed = 0;
    for (const vehicle of editableVehicles()) {
      const current = state.vehicleEdits[vehicle.id]?.caption ?? vehicle.caption;
      if (!current.includes(find)) continue;
      const next = current.split(find).join(replacement).slice(0, 40);
      setVehicleEdit(vehicle.id, "caption", next);
      changed += 1;
    }
    renderContent();
    const counter = shell.querySelector("#lssfo-edit-count");
    if (counter && !changed) counter.textContent = `„${find}“ kommt in keinem Namen vor`;
  }

  function discardVehicleEdits() {
    state.vehicleEdits = {};
    state.vehicleEditStatus = {};
    renderContent();
  }

  async function saveVehicleEdits() {
    if (state.vehicleEditSaving) return;
    const ids = Object.keys(state.vehicleEdits).map(Number);
    if (!ids.length) return;
    state.vehicleEditSaving = true;
    renderContent();
    await runLimited(ids, 2, async (id) => {
      const setStatus = (value) => {
        state.vehicleEditStatus[id] = value;
        const cell = shell.querySelector(`[data-edit-status="${id}"]`);
        if (cell) cell.innerHTML = vehicleEditStatus(id);
      };
      const edits = { ...state.vehicleEdits[id] };
      setStatus("saving");
      try {
        const { form, nameInput, maxInput, typeSelect } = await fetchVehicleForm(id);
        if ("caption" in edits) nameInput.value = edits.caption.trim();
        if ("max" in edits) {
          if (!maxInput) throw new Error("Besatzung ist für dieses Fahrzeug nicht einstellbar");
          if (maxInput.tagName === "SELECT" && ![...maxInput.options].some((option) => option.value === edits.max)) maxInput.add(new Option(edits.max, edits.max));
          maxInput.value = edits.max;
        }
        if ("type" in edits) {
          if (!typeSelect) throw new Error("Umbau ist für dieses Fahrzeug nicht möglich");
          typeSelect.value = edits.type;
        }
        const response = await submitParsedForm(form);
        // Das Spiel zeigt Validierungsfehler im erneut ausgelieferten Formular an.
        const answer = await response.text().catch(() => "");
        const answerDoc = new DOMParser().parseFromString(answer, "text/html");
        const problem = answerDoc.querySelector("#vehicle_caption") && answerDoc.querySelector("#error_explanation, .field_with_errors, .has-error");
        if (problem) throw new Error(problem.textContent.replace(/\s+/g, " ").trim().slice(0, 160) || "vom Spiel abgelehnt");
        const raw = vehicleRaw(id);
        if (raw) {
          if ("caption" in edits) raw.caption = edits.caption.trim();
          if ("max" in edits) raw.max_personnel_override = Number(edits.max) > 0 ? Number(edits.max) : null;
          if ("type" in edits) raw.vehicle_type = Number(edits.type);
        }
        delete state.vehicleEdits[id];
        setStatus("saved");
      } catch (error) {
        setStatus(error.message || "Speichern fehlgeschlagen");
      }
      await delay(80, new AbortController().signal);
    });
    state.vehicleEditSaving = false;
    analyze();
    render();
    void persistCurrentCache();
  }

  function renderVehicles(content) {
    const rows = state.analyzed.filter((vehicle) => {
      const missing = vehicle.missingCrew > 0 || vehicle.missingTraining > 0;
      return (!state.onlyMissing || missing) && matchesQuery(vehicle.caption, vehicle.typeCaption, vehicle.buildingCaption);
    });
    content.innerHTML = table(
      ["Fahrzeug", "Typ", "Wache", "Soll", "Zugewiesen", "Fehlt", "Ausbildung", "Verwaltung"],
      rows.map((vehicle) => {
        const training = vehicle.training.length
          ? vehicle.training.map((item) => `${trainingName(item.key)}: ${item.required}${item.actual === null ? "" : ` / ${item.actual}`}`).join("<br>")
          : '<span class="lssfo-muted">keine</span>';
        const educationBadge = vehicle.missingTraining
          ? badge(`${vehicle.missingTraining} fehlt`, "danger")
          : vehicle.training.length && vehicle.educationScanned ? badge("geprüft", "ok") : "";
        return [
          `<a href="/vehicles/${vehicle.id}/zuweisung" target="_blank" rel="noopener">${escapeHtml(vehicle.caption)}</a>`,
          escapeHtml(vehicle.typeCaption),
          `<a href="/buildings/${vehicle.buildingId}" target="_blank" rel="noopener">${escapeHtml(vehicle.buildingCaption)}</a>`,
          `${vehicle.target} <small class="lssfo-muted">(${vehicle.staffMin}–${vehicle.staffMax})</small>`,
          vehicle.assigned,
          vehicle.missingCrew ? badge(vehicle.missingCrew, "danger") : badge("0", "ok"),
          `<span class="lssfo-training-cell">${training}${educationBadge}</span>`,
          `<button type="button" class="lssfo-btn lssfo-btn-small" data-action="manage-vehicle" data-id="${vehicle.id}">Bearbeiten</button>`,
        ];
      }),
      rows.length,
      "vehicles",
    );
  }

  function renderBuildings(content) {
    const operationalById = new Map((state.operationalModel?.buildings || []).map((building) => [Number(building.id), building]));
    const rows = state.buildingSummary.map((building) => ({ ...building, isDispatchCenter: operationalById.get(Number(building.id))?.isDispatchCenter === true })).filter((building) => {
      const type = state.buildingTypes[String(building.typeId)]?.caption || `Typ ${building.typeId}`;
      const missing = !building.isDispatchCenter && (building.missingCrew > 0 || building.missingTraining > 0);
      return (!state.onlyMissing || missing) && matchesQuery(building.caption, type);
    });
    content.innerHTML = table(
      ["Wache", "Typ", "Fahrzeuge", "Personal", "Zugewiesen", "Frei", "Besatzung fehlt", "Status", "Verwaltung"],
      rows.map((building) => {
        const type = state.buildingTypes[String(building.typeId)]?.caption || `Typ ${building.typeId}`;
        const noOperations = building.isDispatchCenter;
        return [
          `<a href="/buildings/${building.id}" target="_blank" rel="noopener">${escapeHtml(building.caption)}</a>`,
          `${escapeHtml(type)}${noOperations ? ` ${badge("Verwaltung", "neutral")}` : ""}`,
          noOperations ? '<span class="lssfo-not-applicable">–</span>' : building.vehicles,
          noOperations ? '<span class="lssfo-not-applicable">nicht verfügbar</span>' : building.personnelTarget ? `${building.personnel} <small class="lssfo-muted">Soll ${building.personnelTarget}</small>` : building.personnel,
          noOperations ? '<span class="lssfo-not-applicable">–</span>' : `${building.assigned} / ${building.targetCrew}`,
          noOperations ? '<span class="lssfo-not-applicable">–</span>' : building.free,
          noOperations ? badge("nicht relevant", "neutral") : building.missingCrew ? badge(building.missingCrew, "danger") : badge("0", "ok"),
          `<span class="lssfo-status-action">${building.enabled ? badge("aktiv", "ok") : badge("inaktiv", "warn")}<button type="button" class="lssfo-btn lssfo-btn-small" data-action="building-status-toggle" data-building-id="${building.id}"${state.buildingStatusSaving !== null ? " disabled" : ""}>${state.buildingStatusSaving === building.id ? "Bitte warten …" : building.enabled ? "Deaktivieren" : "Aktivieren"}</button></span>`,
          `<button type="button" class="lssfo-btn lssfo-btn-small" data-action="manage-building" data-id="${building.id}">Bearbeiten</button>`,
        ];
      }),
      rows.length,
      "buildings",
    );
  }

  function renderTraining(content) {
    const summary = Core.summarizeTraining(state.analyzed).filter((item) => {
      const missing = item.scannedVehicles && item.missing > 0;
      return (!state.onlyMissing || missing) && matchesQuery(item.school, item.key, trainingName(item.key));
    });
    const hasScan = Object.keys(state.scans).length > 0;
    const intro = `<div class="lssfo-callout">
      <strong>${hasScan ? "Ausbildungsprüfung aktiv" : "Ausbildungsbedarf berechnet"}</strong>
      <span>${hasScan
        ? "„Vorhanden“ zählt passend ausgebildete, dem jeweiligen Fahrzeug zugewiesene Personen."
        : "Klicke auf „Ausbildungen prüfen“, um die tatsächlichen Fahrzeugzuweisungen zu prüfen – eine Abfrage pro Wache, höchstens drei gleichzeitig."}</span>
    </div>`;
    content.innerHTML = intro + table(
      ["Ausbildung", "Bereich", "Fahrzeuge", "Benötigte Plätze", "Vorhanden", "Fehlt", "Prüfstand"],
      summary.map((item) => [
        escapeHtml(trainingName(item.key)),
        escapeHtml(item.school),
        item.vehicles,
        item.required,
        item.scannedVehicles ? item.actual : '<span class="lssfo-muted">–</span>',
        item.scannedVehicles ? (item.missing ? badge(item.missing, "danger") : badge("0", "ok")) : '<span class="lssfo-muted">–</span>',
        `${item.scannedVehicles} / ${item.vehicles}`,
      ]),
      summary.length,
      "training",
    );
  }

  // /api/schoolings liefert je Lehrgang nur education_title, building_id, finish_time,
  // running und open_spaces. Schule und Beginn werden daraus abgeleitet: die Schule über
  // die Gebäudeliste, der Beginn über die Lehrgangsdauer aus dem LSSM-Katalog.
  function courseRows() {
    const buildingCaptions = new Map(state.buildings.map((building) => [Number(building.id), building.caption]));
    const durations = new Map();
    for (const list of Object.values(state.schoolingTypes || {})) {
      for (const entry of Array.isArray(list) ? list : []) {
        const days = Number(String(entry.duration || "").match(/(\d+)\s*Tag/i)?.[1]);
        if (entry.caption && days) durations.set(String(entry.caption).trim().toLowerCase(), days);
      }
    }
    return state.schoolings.map((course) => {
      const title = course.education_title || course.caption || course.name || `Lehrgang ${course.id ?? ""}`;
      const finish = course.finish_time || course.finish_at || "";
      const finishDate = finish ? new Date(finish) : null;
      const days = durations.get(String(title).trim().toLowerCase());
      const start = finishDate && !Number.isNaN(finishDate.valueOf()) && days ? new Date(finishDate.valueOf() - days * 86400000) : null;
      return {
        title,
        school: buildingCaptions.get(Number(course.building_id)) || course.building_caption || "",
        running: course.running !== false,
        start,
        finish: finishDate && !Number.isNaN(finishDate.valueOf()) ? finishDate : null,
        openSpaces: Number.isFinite(Number(course.open_spaces)) ? Number(course.open_spaces) : null,
      };
    });
  }

  function renderCourses(content) {
    const courses = courseRows().filter((course) => matchesQuery(course.title, course.school));
    const courseActions = `<div class="lssfo-content-actions"><div><strong>Lehrgangsverwaltung</strong><span>Eigene Schule auswählen und die Spieloberfläche direkt im Panel verwenden.</span></div><button type="button" class="lssfo-btn lssfo-btn-primary" data-action="course-open">${icon("plus")}<span>Lehrgang starten</span></button></div>`;
    if (!courses.length) {
      content.innerHTML = `${courseActions}<div class="lssfo-empty">Keine laufenden eigenen Lehrgänge gefunden.</div>`;
      return;
    }
    content.innerHTML = courseActions + table(
      ["Lehrgang", "Schule", "Status", "Beginn", "Ende", "Restzeit", "Freie Plätze"],
      courses.map((course) => [
        escapeHtml(course.title),
        escapeHtml(course.school || "–"),
        course.running ? badge("Läuft", "ok") : badge("Offen", "warn"),
        course.start ? formatDate(course.start) : "–",
        course.finish ? formatDate(course.finish) : "–",
        course.finish ? escapeHtml(relativeTime(course.finish)) : "–",
        course.openSpaces ?? "–",
      ]),
      courses.length,
      "courses",
    );
  }

  function renderMap(content) {
    const buildingById = new Map(state.buildingSummary.map((building) => [Number(building.id), building]));
    const operationalById = new Map((state.operationalModel?.buildings || []).map((building) => [Number(building.id), building]));
    const districtGeoJson = state.districtsEnabled ? getDistrictGeoJson() : null;
    const buildingDistricts = new Map(state.buildings.map((building) => [
      Number(building.id),
      districtGeoJson ? districtAtPoint(Number(building.longitude), Number(building.latitude), districtGeoJson) : "",
    ]));
    const vehiclesByBuilding = new Map();
    for (const vehicle of state.analyzed) {
      const id = Number(vehicle.buildingId);
      if (!vehiclesByBuilding.has(id)) vehiclesByBuilding.set(id, []);
      vehiclesByBuilding.get(id).push(vehicle);
    }
    const vehicleTypes = [...new Map(state.analyzed.map((vehicle) => [String(vehicle.typeId), vehicle.typeCaption])).entries()]
      .sort((a, b) => a[1].localeCompare(b[1], "de", { numeric: true }));
    const buildingTypes = [...new Map(state.buildings.map((building) => {
      const type = state.buildingTypes[String(building.building_type)]?.caption || `Typ ${building.building_type}`;
      return [String(building.building_type), type];
    })).entries()].sort((a, b) => a[1].localeCompare(b[1], "de", { numeric: true }));
    const districts = [...new Set([...buildingDistricts.values()].filter(Boolean))]
      .sort((a, b) => a.localeCompare(b, "de", { numeric: true }));
    const dispatchCenters = (state.operationalModel?.dispatchCenters || []).map((building) => [String(building.id), building.caption])
      .sort((a, b) => a[1].localeCompare(b[1], "de", { numeric: true }));
    const locations = state.buildings.filter((building) => {
      const latitude = Number(building.latitude);
      const longitude = Number(building.longitude);
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return false;
      const summary = buildingById.get(Number(building.id));
      const vehicles = vehiclesByBuilding.get(Number(building.id)) || [];
      const missing = (summary?.missingCrew || 0) > 0 || (summary?.missingTraining || 0) > 0;
      const hasSelectedVehicle = state.mapVehicleType === "all"
        || vehicles.some((vehicle) => String(vehicle.typeId) === state.mapVehicleType);
      const hasSelectedBuildingType = state.mapBuildingType === "all"
        || String(building.building_type) === state.mapBuildingType;
      const district = buildingDistricts.get(Number(building.id)) || "";
      const hasSelectedDistrict = state.mapDistrict === "all" || district === state.mapDistrict;
      const dispatchCenterId = operationalById.get(Number(building.id))?.dispatchCenterId;
      const hasSelectedDispatch = state.mapDispatchCenter === "all" || (state.mapDispatchCenter === "none" ? dispatchCenterId === null : String(dispatchCenterId) === state.mapDispatchCenter);
      return hasSelectedVehicle && hasSelectedBuildingType && hasSelectedDistrict && hasSelectedDispatch && (!state.onlyMissing || missing) && matchesQuery(
        building.caption,
        state.buildingTypes[String(building.building_type)]?.caption,
        district,
        ...vehicles.flatMap((vehicle) => [vehicle.caption, vehicle.typeCaption]),
      );
    });
    if (!locations.length) {
      content.innerHTML = `${mapFilterControls(vehicleTypes, buildingTypes, districts, dispatchCenters, Boolean(districtGeoJson))}<div class="lssfo-empty">Keine Wache erfüllt die gewählten Kartenfilter.</div>`;
      return;
    }
    const list = locations.slice().sort((a, b) => String(a.caption).localeCompare(String(b.caption), "de", { numeric: true })).map((building) => {
      const allVehicles = vehiclesByBuilding.get(Number(building.id)) || [];
      const vehicles = state.mapVehicleType === "all"
        ? allVehicles
        : allVehicles.filter((vehicle) => String(vehicle.typeId) === state.mapVehicleType);
      const countLabel = state.mapVehicleType === "all" ? `${formatNumber(vehicles.length)} Fz.` : `${formatNumber(vehicles.length)} Treffer`;
      const district = buildingDistricts.get(Number(building.id));
      const enabled = building.enabled !== false;
      const dispatchCaption = operationalById.get(Number(building.id))?.dispatchCenterCaption;
      const subline = [state.buildingTypes[String(building.building_type)]?.caption || "Wache", district ? `Bezirk ${district}` : "", dispatchCaption, enabled ? "aktiv" : "inaktiv"].filter(Boolean).join(" · ");
      return `<button type="button" class="lssfo-map-list-item${enabled ? "" : " is-inactive"}" data-action="map-focus" data-building-id="${building.id}"><span><strong>${escapeHtml(building.caption)}</strong><small>${escapeHtml(subline)}</small></span><b>${countLabel}</b></button>`;
    }).join("");
    content.innerHTML = `${mapFilterControls(vehicleTypes, buildingTypes, districts, dispatchCenters, Boolean(districtGeoJson))}<div class="lssfo-map-layout">
      <aside class="lssfo-map-list"><div class="lssfo-map-list-head"><strong>${formatNumber(locations.length)} Wachen</strong><span>Wache anklicken, um die stationierten Fahrzeuge zu sehen.</span></div>${list}</aside>
      <div class="lssfo-map-stage"><div class="lssfo-map-legend"><span><i class="ok"></i> vollständig</span><span><i class="danger"></i> Fehlbedarf</span><span><i class="inactive"></i> inaktiv</span></div><div id="lssfo-map-canvas" aria-label="Karte der Wachen und Fahrzeuge"></div></div>
    </div>`;
    initializeOverviewMap(locations, buildingById, vehiclesByBuilding, districtGeoJson, buildingDistricts);
  }

  function mapFilterControls(vehicleTypes, buildingTypes, districts, dispatchCenters, districtDataAvailable) {
    const vehicleOptions = vehicleTypes.map(([id, caption]) => `<option value="${escapeHtml(id)}"${state.mapVehicleType === id ? " selected" : ""}>${escapeHtml(caption)}</option>`).join("");
    const buildingOptions = buildingTypes.map(([id, caption]) => `<option value="${escapeHtml(id)}"${state.mapBuildingType === id ? " selected" : ""}>${escapeHtml(caption)}</option>`).join("");
    const districtOptions = districts.map((name) => `<option value="${escapeHtml(name)}"${state.mapDistrict === name ? " selected" : ""}>${escapeHtml(name)}</option>`).join("");
    const dispatchOptions = dispatchCenters.map(([id, caption]) => `<option value="${escapeHtml(id)}"${state.mapDispatchCenter === id ? " selected" : ""}>${escapeHtml(caption)}</option>`).join("");
    const active = state.mapVehicleType !== "all" || state.mapBuildingType !== "all" || state.mapDistrict !== "all" || state.mapDispatchCenter !== "all";
    return `<div class="lssfo-map-filters">
      <label>Fahrzeugtyp<select id="lssfo-map-vehicle-filter"><option value="all">Alle Fahrzeugtypen</option>${vehicleOptions}</select></label>
      <label>Wachenart<select id="lssfo-map-building-filter"><option value="all">Alle Wachenarten</option>${buildingOptions}</select></label>
      <label>Leitstelle<select id="lssfo-map-dispatch-filter"><option value="all">Alle Leitstellen</option><option value="none"${state.mapDispatchCenter === "none" ? " selected" : ""}>Ohne Leitstelle</option>${dispatchOptions}</select></label>
      <label>Bezirk<select id="lssfo-map-district-filter"${state.districtsEnabled && districtDataAvailable ? "" : " disabled"}><option value="all">Alle Bezirke</option>${districtOptions}</select></label>
      <label class="lssfo-district-toggle"><input id="lssfo-map-district-toggle" type="checkbox"${state.districtsEnabled ? " checked" : ""}> Bezirksgrenzen</label>
      <label class="lssfo-district-toggle"><input id="lssfo-map-readiness-toggle" type="checkbox"${state.readinessEnabled ? " checked" : ""}${state.districtsEnabled && districtDataAvailable ? "" : " disabled"}> Bereitschaft</label>
      <label class="lssfo-district-toggle"><input id="lssfo-map-coverage-toggle" type="checkbox"${state.coverageEnabled ? " checked" : ""}> Leitstellengebiete</label>
      <button type="button" class="lssfo-btn" data-action="map-filter-reset"${active ? "" : " disabled"}>Filter zurücksetzen</button>
      <span>${state.districtsEnabled ? (districtDataAvailable ? "Bezirke: Statistik Austria / GeoSphere Austria, Stand Februar 2025 (CC BY 4.0)" : "Bezirksdaten konnten nicht geladen werden") : "Bezirksanzeige ausgeschaltet"}</span>
    </div>`;
  }

  function initializeOverviewMap(buildings, buildingById, vehiclesByBuilding, districtGeoJson, buildingDistricts) {
    const Leaflet = globalThis.L;
    const container = shell.querySelector("#lssfo-map-canvas");
    if (!container || !Leaflet) {
      if (container) container.innerHTML = '<div class="lssfo-empty">Die Kartenbibliothek konnte nicht geladen werden. Bitte die Seite neu laden.</div>';
      return;
    }
    // Canvas statt SVG: Die Bezirksgrenzen haben über 200.000 Punkte.
    const map = Leaflet.map(container, { zoomControl: true, preferCanvas: true });
    // Leaflet benötigt vor dem ersten GeoJSON-Vektor eine gültige Kartenansicht.
    // Die Ansicht wird nach dem Aufbau auf die gefilterten Wachen eingepasst.
    map.setView([47.6, 14.2], 7);
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>',
    }).addTo(map);
    if (districtGeoJson) {
      const dark = shell.dataset.theme === "dark";
      const readinessByDistrict = new Map();
      for (const building of state.operationalModel?.operationalBuildings || []) {
        if (!building.district) continue;
        const values = readinessByDistrict.get(building.district) || { buildings: 0, inactive: 0, targetCrew: 0, missingCrew: 0, missingTraining: 0 };
        values.buildings += 1;
        values.inactive += building.enabled === false ? 1 : 0;
        values.targetCrew += Number(building.summary.targetCrew || 0);
        values.missingCrew += Number(building.summary.missingCrew || 0);
        values.missingTraining += Number(building.summary.missingTraining || 0);
        readinessByDistrict.set(building.district, values);
      }
      Leaflet.geoJSON(getDistrictDisplayGeoJson() || districtGeoJson, {
        interactive: false,
        style: (feature) => {
          const values = readinessByDistrict.get(formatDistrictName(feature.properties?.name));
          const score = values ? readinessScore(values) : 0;
          const fill = !state.readinessEnabled ? (dark ? "#f0ad4e" : "#f6b44d") : score >= 90 ? "#5cb85c" : score >= 70 ? "#f0ad4e" : score > 0 ? "#d9534f" : "#8a9297";
          return { color: state.readinessEnabled ? fill : dark ? "#f0ad4e" : "#a45c00", weight: 2, opacity: .88, fillColor: fill, fillOpacity: state.readinessEnabled ? .13 : dark ? .045 : .035, dashArray: "7 5" };
        },
        onEachFeature: (feature, layer) => {
          const name = formatDistrictName(feature.properties?.name);
          const values = readinessByDistrict.get(name);
          const score = values ? readinessScore(values) : null;
          if (name) layer.bindTooltip(`${escapeHtml(name)}${state.readinessEnabled && score !== null ? ` · ${score}%` : ""}`, { permanent: true, direction: "center", className: "lssfo-district-label" });
        },
      }).addTo(map);
    }
    if (state.coverageEnabled) addDispatchCoverage(map, Leaflet);
    state.mapInstance = map;
    state.mapMarkers = new Map();
    const bounds = [];
    for (const building of buildings) {
      const id = Number(building.id);
      const latitude = Number(building.latitude);
      const longitude = Number(building.longitude);
      const summary = buildingById.get(id);
      const allVehicles = vehiclesByBuilding.get(id) || [];
      const vehicles = state.mapVehicleType === "all"
        ? allVehicles
        : allVehicles.filter((vehicle) => String(vehicle.typeId) === state.mapVehicleType);
      const missing = (summary?.missingCrew || 0) > 0 || (summary?.missingTraining || 0) > 0;
      const enabled = building.enabled !== false;
      const marker = Leaflet.circleMarker([latitude, longitude], {
        radius: Math.min(14, 6 + Math.sqrt(vehicles.length)),
        weight: 2,
        color: enabled ? (missing ? "#a94442" : "#3c763d") : "#5f666b",
        fillColor: enabled ? (missing ? "#d9534f" : "#5cb85c") : "#8a9297",
        fillOpacity: .88,
      });
      // Popup-Inhalt erst beim Öffnen erzeugen – sonst entsteht das HTML für jede Wache vorab.
      const vehicleRows = () => vehicles.length
        ? vehicles.slice().sort((a, b) => textCollator.compare(a.caption, b.caption)).map((vehicle) => {
          const missingCrew = Number(vehicle.missingCrew || 0);
          const missingTraining = Number(vehicle.missingTraining || 0);
          const hasMissing = missingCrew > 0 || missingTraining > 0;
          const status = missingCrew > 0
            ? `${missingCrew} Pers. fehlt${missingCrew === 1 ? "" : "en"}`
            : missingTraining > 0 ? `${missingTraining} Ausbildung fehlt` : "vollständig";
          return `<li class="${hasMissing ? "has-missing" : "is-complete"}"><span class="lssfo-map-vehicle-main"><a href="/vehicles/${vehicle.id}/zuweisung" target="_blank" rel="noopener">${escapeHtml(vehicle.caption)}</a><small>${escapeHtml(vehicle.typeCaption)} · ${vehicle.assigned}/${vehicle.target} Personen</small></span><b>${escapeHtml(status)}</b></li>`;
        }).join("")
        : '<li class="lssfo-muted">Keine Fahrzeuge an dieser Wache</li>';
      const filteredHint = state.mapVehicleType === "all" ? "stationierte Fahrzeuge" : "passende Fahrzeuge";
      const missingVehicles = vehicles.filter((vehicle) => vehicle.missingCrew > 0 || vehicle.missingTraining > 0).length;
      const district = buildingDistricts.get(id);
      marker.bindTooltip(`${escapeHtml(building.caption)} · ${vehicles.length} ${filteredHint}`);
      marker.bindPopup(() => `<div class="lssfo-map-popup"><h3><a href="/buildings/${id}" target="_blank" rel="noopener">${escapeHtml(building.caption)}</a></h3><div class="lssfo-map-popup-meta">${district ? `<span class="lssfo-district-chip">Bezirk ${escapeHtml(district)}</span>` : ""}${badge(enabled ? "aktiv" : "inaktiv", enabled ? "ok" : "warn")}<button type="button" class="lssfo-btn lssfo-btn-small" data-action="building-status-toggle" data-building-id="${id}"${state.buildingStatusSaving !== null ? " disabled" : ""}>${state.buildingStatusSaving === id ? "Bitte warten …" : enabled ? "Deaktivieren" : "Aktivieren"}</button></div><p>${vehicles.length} ${filteredHint}${state.mapVehicleType === "all" ? "" : ` · insgesamt ${allVehicles.length}`} · <strong class="${missingVehicles ? "danger" : "ok"}">${missingVehicles ? `${missingVehicles} Fahrzeug${missingVehicles === 1 ? "" : "e"} mit Fehlbedarf` : "Besatzung vollständig"}</strong></p><ul>${vehicleRows()}</ul></div>`, { maxWidth: 440, maxHeight: 390 });
      marker.addTo(map);
      state.mapMarkers.set(id, marker);
      bounds.push([latitude, longitude]);
    }
    if (bounds.length === 1) map.setView(bounds[0], 13);
    else map.fitBounds(bounds, { padding: [28, 28], maxZoom: 13 });
    setTimeout(() => state.mapInstance?.invalidateSize(), 0);
  }

  function addDispatchCoverage(map, Leaflet) {
    const model = state.operationalModel;
    if (!model) return;
    for (const dispatch of model.dispatchCenters) {
      if (state.mapDispatchCenter !== "all" && String(dispatch.id) !== state.mapDispatchCenter) continue;
      const latitude = Number(dispatch.latitude);
      const longitude = Number(dispatch.longitude);
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) continue;
      const assigned = model.operationalBuildings.filter((building) => building.dispatchCenterId === Number(dispatch.id));
      const radius = Math.max(4000, ...assigned.map((building) => haversineMeters(latitude, longitude, Number(building.latitude), Number(building.longitude))).filter(Number.isFinite));
      Leaflet.circle([latitude, longitude], { radius: Math.min(radius * 1.08, 180000), color: "#337ab7", weight: 1.5, dashArray: "8 6", fillColor: "#337ab7", fillOpacity: .035, interactive: false }).addTo(map);
    }
  }

  function haversineMeters(lat1, lon1, lat2, lon2) {
    if (![lat1, lon1, lat2, lon2].every(Number.isFinite)) return NaN;
    const toRadians = (value) => value * Math.PI / 180;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) ** 2;
    return 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function focusMapBuilding(buildingId) {
    const marker = state.mapMarkers.get(buildingId);
    if (!marker || !state.mapInstance) return;
    state.mapInstance.setView(marker.getLatLng(), Math.max(state.mapInstance.getZoom(), 13), { animate: true });
    marker.openPopup();
  }

  function destroyOverviewMap() {
    if (state.mapInstance) {
      state.mapInstance.remove();
      state.mapInstance = null;
    }
    state.mapMarkers = new Map();
  }

  function getDistrictGeoJson() {
    if (state.districtGeoJson !== undefined) return state.districtGeoJson;
    try {
      const raw = typeof GM_getResourceText === "function"
        ? GM_getResourceText("lssfoAustriaDistricts")
        : "";
      const parsed = raw ? JSON.parse(raw) : null;
      if (!parsed || parsed.type !== "FeatureCollection" || !Array.isArray(parsed.features)) {
        throw new Error("Ungültige Bezirksdaten");
      }
      const normalizedFeatures = parsed.features.map((feature) => ({
        ...feature,
        properties: {
          ...feature.properties,
          iso: feature.properties?.iso || feature.properties?.g_id || "",
          name: feature.properties?.name || feature.properties?.g_name || "",
        },
      }));
      // Einige Datensätze enthalten Wien zusätzlich als Gesamtbezirk. Sobald
      // die 23 Wiener Bezirke vorhanden sind, wird diese doppelte Fläche entfernt.
      const hasViennaDistricts = normalizedFeatures.some((feature) => /^9(?:0[1-9]|1\d|2[0-3])$/.test(String(feature.properties?.iso || "")));
      state.districtGeoJson = {
        ...parsed,
        features: normalizedFeatures.filter((feature) => !(hasViennaDistricts && String(feature.properties?.iso || "") === "900")),
      };
    } catch {
      state.districtGeoJson = null;
    }
    return state.districtGeoJson;
  }

  // Für die Darstellung reichen ~40 m Genauigkeit; die Zuordnung der Wachen
  // nutzt weiterhin die vollen Grenzen. Spart den Großteil der Umrechnung in Leaflet.
  function getDistrictDisplayGeoJson() {
    if (state.districtDisplayGeoJson !== undefined) return state.districtDisplayGeoJson;
    const source = getDistrictGeoJson();
    state.districtDisplayGeoJson = source
      ? { ...source, features: source.features.map((feature) => ({ ...feature, geometry: simplifyGeometry(feature.geometry, 0.0004) })) }
      : null;
    return state.districtDisplayGeoJson;
  }

  function simplifyGeometry(geometry, tolerance) {
    const simplifyRing = (points) => {
      if (points.length <= 8) return points;
      const result = [points[0]];
      let [lastX, lastY] = points[0];
      for (let index = 1; index < points.length - 1; index += 1) {
        const [x, y] = points[index];
        if (Math.abs(x - lastX) > tolerance || Math.abs(y - lastY) > tolerance) {
          result.push(points[index]);
          lastX = x;
          lastY = y;
        }
      }
      result.push(points[points.length - 1]);
      return result.length >= 4 ? result : points;
    };
    if (geometry?.type === "Polygon") return { ...geometry, coordinates: geometry.coordinates.map(simplifyRing) };
    if (geometry?.type === "MultiPolygon") return { ...geometry, coordinates: geometry.coordinates.map((polygon) => polygon.map(simplifyRing)) };
    return geometry;
  }

  function districtAtPoint(longitude, latitude, geoJson) {
    const feature = districtFeatureAtPoint(longitude, latitude, geoJson);
    return formatDistrictName(feature?.properties?.name);
  }

  // Die Bezirksgrenzen haben über 200.000 Punkte. Begrenzungsrahmen sortieren
  // fast alle Bezirke vorab aus, und das Ergebnis je Koordinate bleibt gespeichert,
  // weil jede Neuberechnung dieselben Wachen erneut zuordnet.
  function districtFeatureAtPoint(longitude, latitude, geoJson) {
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude) || !geoJson?.features) return null;
    const key = `${longitude},${latitude}`;
    if (districtCache.has(key)) return districtCache.get(key);
    const feature = geoJson.features.find((entry) => {
      const [minX, minY, maxX, maxY] = districtBox(entry);
      return longitude >= minX && longitude <= maxX && latitude >= minY && latitude <= maxY
        && geometryContainsPoint(entry.geometry, [longitude, latitude]);
    }) || null;
    districtCache.set(key, feature);
    return feature;
  }

  function districtBox(feature) {
    if (districtBoxes.has(feature)) return districtBoxes.get(feature);
    const box = [Infinity, Infinity, -Infinity, -Infinity];
    const polygons = feature.geometry?.type === "Polygon" ? [feature.geometry.coordinates] : feature.geometry?.type === "MultiPolygon" ? feature.geometry.coordinates : [];
    for (const polygon of polygons) {
      for (const [x, y] of polygon[0] || []) {
        if (x < box[0]) box[0] = x;
        if (y < box[1]) box[1] = y;
        if (x > box[2]) box[2] = x;
        if (y > box[3]) box[3] = y;
      }
    }
    districtBoxes.set(feature, box);
    return box;
  }

  function federalStateFromFeature(feature) {
    const properties = feature?.properties || {};
    const explicit = properties.state || properties.bundesland || properties.name_1 || properties.land;
    if (explicit) return formatDistrictName(explicit);
    const digit = String(properties.iso || properties.gkz || "").replace(/\D/g, "")[0];
    return ({
      1: "Burgenland",
      2: "Kärnten",
      3: "Niederösterreich",
      4: "Oberösterreich",
      5: "Salzburg",
      6: "Steiermark",
      7: "Tirol",
      8: "Vorarlberg",
      9: "Wien",
    })[digit] || "";
  }

  function formatDistrictName(value) {
    return String(value || "").replace(/\s+/g, " ").replace(/,\s*/g, ", ").replace(/([^\s])\(/g, "$1 (");
  }

  function geometryContainsPoint(geometry, point) {
    if (!geometry) return false;
    const polygons = geometry.type === "Polygon"
      ? [geometry.coordinates]
      : geometry.type === "MultiPolygon" ? geometry.coordinates : [];
    return polygons.some((polygon) => pointInRing(point, polygon[0])
      && !polygon.slice(1).some((hole) => pointInRing(point, hole)));
  }

  function pointInRing([x, y], ring) {
    let inside = false;
    for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index, index += 1) {
      const [currentX, currentY] = ring[index];
      const [previousX, previousY] = ring[previous];
      const crosses = ((currentY > y) !== (previousY > y))
        && x < ((previousX - currentX) * (y - currentY)) / (previousY - currentY || Number.EPSILON) + currentX;
      if (crosses) inside = !inside;
    }
    return inside;
  }

  function findSchoolBuildings() {
    return state.buildings.filter((building) => {
      const type = state.buildingTypes[String(building.building_type)] || {};
      const text = `${type.caption || ""} ${building.caption || ""}`.toLocaleLowerCase("de");
      return Boolean(type.school || type.isSchool || type.is_school) || /schule|akademie/.test(text);
    }).sort((a, b) => String(a.caption).localeCompare(String(b.caption), "de", { numeric: true }));
  }

  function openCourseAssistant() {
    const schools = findSchoolBuildings();
    // Eine einzige Schule: direkt im Spiel öffnen (Lightbox), sonst kurz auswählen lassen.
    if (schools.length === 1 && openGameLightbox(`/buildings/${schools[0].id}`)) return;
    state.courseAssistant = { schools, schoolId: schools[0]?.id || null };
    renderCourseAssistant();
  }

  function closeCourseAssistant() {
    state.courseAssistant = null;
    const element = shell.querySelector("#lssfo-course-assistant");
    if (element) {
      element.hidden = true;
      element.innerHTML = "";
    }
  }

  function renderCourseAssistant() {
    const element = shell.querySelector("#lssfo-course-assistant");
    const assistant = state.courseAssistant;
    if (!assistant) {
      element.hidden = true;
      return;
    }
    element.hidden = false;
    const options = assistant.schools.map((school) => `<option value="${school.id}"${Number(school.id) === Number(assistant.schoolId) ? " selected" : ""}>${escapeHtml(school.caption)}</option>`).join("");
    const schoolUrl = assistant.schoolId ? `/buildings/${assistant.schoolId}#schooling` : "";
    element.innerHTML = `<div class="lssfo-manager-backdrop" data-action="course-close"></div>
      <aside class="lssfo-course-card" role="dialog" aria-modal="true" aria-label="Lehrgang starten">
        <header class="lssfo-manager-header"><div><span>LEHRGÄNGE</span><h2>Lehrgang starten</h2></div><button type="button" class="lssfo-icon-btn" data-action="course-close" aria-label="Schließen">${icon("close")}</button></header>
        <div class="lssfo-course-controls">
          <label>Ausbildungsstätte<select id="lssfo-course-school">${options || '<option value="">Keine eigene Schule erkannt</option>'}</select></label>
          ${schoolUrl ? `<a class="lssfo-btn" href="${schoolUrl}" target="_blank" rel="noopener">In neuem Tab öffnen ↗</a>` : ""}
          <p>Im eingebetteten Schulungsbereich kannst du den Lehrgang anlegen und anschließend Personal aus verschiedenen Wachen auswählen. Die eigentliche Buchung erfolgt erst über die Schaltflächen des Spiels.</p>
        </div>
        ${hasGameLightbox() && schoolUrl ? `<div class="lssfo-course-open"><button type="button" class="lssfo-btn lssfo-btn-primary" data-action="course-open-school">Lehrgangsbereich öffnen</button><span>Öffnet die Ausbildungsstätte im Spiel – dort Lehrgang wählen und Personal aus allen Wachen auswählen.</span></div>` : `<div class="lssfo-course-frame-wrap">${schoolUrl ? `<iframe id="lssfo-course-frame" src="${schoolUrl}" title="Leitstellenspiel-Schulungsbereich"></iframe>` : '<div class="lssfo-empty">Es wurde keine Ausbildungsstätte erkannt. Prüfe, ob deine Schuldaten über „Aktualisieren“ geladen wurden.</div>'}</div>`}
      </aside>`;
    const frame = element.querySelector("#lssfo-course-frame");
    frame?.addEventListener("load", () => {
      try {
        const schoolingTab = frame.contentDocument?.querySelector('a[href="#schooling"]');
        if (schoolingTab) schoolingTab.click();
      } catch { /* Die native Seite bleibt vollständig bedienbar. */ }
    });
    monitorEmbeddedFrame(frame, "Der Schulungsbereich konnte im Panel nicht dargestellt werden. Öffne die ausgewählte Ausbildungsstätte oben in einem neuen Tab.");
  }

  // Zeigt eine Spielseite (Wache, Personal, Fahrzeug) direkt im Panel an – kein neuer Tab.
  // Die Seite ist voll bedienbar; Links darin bleiben im eingebetteten Fenster.
  function openGameView(url, title) {
    if (openGameLightbox(url)) return;
    const element = shell.querySelector("#lssfo-game-view");
    const kind = /\/personals/.test(url) ? "PERSONAL" : /^\/vehicles\//.test(url) ? "FAHRZEUG" : "WACHE";
    state.gameView = { url };
    element.hidden = false;
    element.innerHTML = `<div class="lssfo-manager-backdrop" data-action="game-view-close"></div>
      <aside class="lssfo-course-card lssfo-game-view" role="dialog" aria-modal="true" aria-label="${escapeHtml(title || "Spielseite")}">
        <header class="lssfo-manager-header"><div><span>${kind} · IM SPIEL</span><h2>${escapeHtml(title || "Spielseite")}</h2></div>
          <div class="lssfo-game-view-actions">
            <button type="button" class="lssfo-icon-btn" data-action="game-view-back" aria-label="Zurück" title="Zurück">‹</button>
            <button type="button" class="lssfo-icon-btn" data-action="game-view-reload" aria-label="Neu laden" title="Neu laden">${icon("refresh")}</button>
            <button type="button" class="lssfo-icon-btn" data-action="game-view-close" aria-label="Schließen" title="Schließen">${icon("close")}</button>
          </div></header>
        <div class="lssfo-course-frame-wrap"><iframe id="lssfo-game-frame" src="${escapeHtml(url)}" title="${escapeHtml(title || "Spielseite")}"></iframe></div>
      </aside>`;
    monitorEmbeddedFrame(element.querySelector("#lssfo-game-frame"), "Diese Seite lässt sich nicht im Panel anzeigen. Mit Strg-Klick auf den Link öffnet sie sich in einem neuen Tab.");
  }

  function hasGameLightbox() {
    const pageWindow = typeof unsafeWindow !== "undefined" ? unsafeWindow : window;
    return typeof pageWindow.lightboxOpen === "function";
  }

  // Die Lightbox des Spiels zeigt Wachen-, Personal- und Fahrzeugseiten zuverlässig an
  // (genau so öffnet sie das Spiel selbst). Sie liegt über dem Panel im selben Fenster.
  function openGameLightbox(url) {
    const pageWindow = typeof unsafeWindow !== "undefined" ? unsafeWindow : window;
    if (typeof pageWindow.lightboxOpen !== "function") return false;
    try {
      document.documentElement.classList.add("lssfo-lightbox-front");
      pageWindow.lightboxOpen(url);
    } catch {
      document.documentElement.classList.remove("lssfo-lightbox-front");
      return false;
    }
    // Das Spiel blendet die Lightbox per Inline-Style aus; das zu lesen kostet keine Layoutberechnung.
    clearInterval(openGameLightbox.watch);
    openGameLightbox.watch = setInterval(() => {
      const box = document.getElementById("lightbox_box");
      if (box && box.style.display !== "none" && !box.hidden) return;
      clearInterval(openGameLightbox.watch);
      document.documentElement.classList.remove("lssfo-lightbox-front");
      afterGameView(url);
    }, 500);
    return true;
  }

  // Nach dem Schließen einer Spielseite: Personalliste dieser Wache neu lesen.
  function afterGameView(url) {
    const buildingId = Number(String(url || "").match(/^\/buildings\/(\d+)/)?.[1]);
    if (buildingId) void refreshBuildingAssignments(buildingId);
  }

  function closeGameView() {
    const element = shell.querySelector("#lssfo-game-view");
    const view = state.gameView;
    state.gameView = null;
    if (element) {
      element.hidden = true;
      element.innerHTML = "";
    }
    if (view) afterGameView(view.url);
  }

  async function refreshBuildingAssignments(buildingId) {
    try {
      const response = await fetch(`/buildings/${buildingId}/personals`, { credentials: "include" });
      if (!response.ok) return;
      const scan = parseBuildingAssignments(await response.text());
      state.personnelScans[String(buildingId)] = scan.station;
      for (const vehicle of state.analyzed.filter((entry) => entry.buildingId === buildingId)) {
        if (!state.scans[String(vehicle.id)] && !scan.vehicles.has(vehicle.id)) continue;
        state.scans[String(vehicle.id)] = scan.vehicles.get(vehicle.id) || { counts: {}, assignedRows: 0, scannedAt: Date.now() };
      }
      analyze();
      renderContent();
      void persistCurrentCache();
    } catch { /* Die Daten werden beim nächsten Aktualisieren übernommen. */ }
  }

  function monitorEmbeddedFrame(frame, message) {
    if (!frame) return;
    frame.addEventListener("load", () => setTimeout(() => {
      try {
        const text = frame.contentDocument?.body?.innerText?.trim() || "";
        if (text.length >= 20) return;
        const wrap = frame.parentElement;
        if (!wrap || wrap.querySelector(".lssfo-frame-warning")) return;
        wrap.insertAdjacentHTML("afterbegin", `<div class="lssfo-frame-warning">${icon("alert")}<span>${escapeHtml(message)}</span></div>`);
      } catch { /* Bei Fremdinhalt bleibt die Schaltfläche „In neuem Tab öffnen“ verfügbar. */ }
    }, 700), { once: true });
  }

  // Sortiert alle Zeilen, zeichnet aber nur die ersten Seiten – Tabellen mit
  // tausenden Zeilen bremsen sonst jeden Bereichswechsel spürbar aus.
  function table(headers, rows, count, tableKey) {
    if (!rows.length) return '<div class="lssfo-empty">Keine passenden Einträge gefunden.</div>';
    const sort = state.sorts[tableKey];
    const sortedRows = sort
      ? rows.map((row, index) => ({ row, index, key: sortKey(row[sort.column]) })).sort((a, b) => {
        const compared = compareSortKeys(a.key, b.key);
        return (sort.direction === "desc" ? -compared : compared) || a.index - b.index;
      }).map((entry) => entry.row)
      : rows;
    const limit = state.tableLimits[tableKey] || TABLE_PAGE_SIZE;
    const visibleRows = sortedRows.slice(0, limit);
    const remaining = sortedRows.length - visibleRows.length;
    const more = remaining > 0
      ? `<div class="lssfo-table-more"><span>${formatNumber(visibleRows.length)} von ${formatNumber(sortedRows.length)} angezeigt</span><button type="button" class="lssfo-btn" data-action="table-more" data-table="${escapeHtml(tableKey)}">Weitere ${formatNumber(Math.min(TABLE_PAGE_SIZE, remaining))} anzeigen</button><button type="button" class="lssfo-btn" data-action="table-all" data-table="${escapeHtml(tableKey)}">Alle anzeigen</button></div>`
      : "";
    return `<div class="lssfo-table-meta">${formatNumber(count)} ${count === 1 ? "Eintrag" : "Einträge"} · Spaltenüberschrift anklicken zum Sortieren</div><div class="lssfo-table-wrap"><table><thead><tr>${sortableHeaders(headers, tableKey)}</tr></thead><tbody>${visibleRows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody></table></div>${more}`;
  }

  function sortableHeaders(headers, tableKey) {
    const sort = state.sorts[tableKey];
    return headers.map((header, column) => {
      const active = sort?.column === column;
      const direction = active ? sort.direction : "";
      const sortIcon = icon(direction === "asc" ? "sort-asc" : direction === "desc" ? "sort-desc" : "sort");
      const ariaSort = direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none";
      return `<th aria-sort="${ariaSort}"><button type="button" class="lssfo-sort${active ? " active" : ""}" data-action="table-sort" data-sort-table="${escapeHtml(tableKey)}" data-sort-column="${column}"><span>${escapeHtml(header)}</span><span class="lssfo-sort-icon" aria-hidden="true">${sortIcon}</span></button></th>`;
    }).join("");
  }

  function compareTableValues(left, right) {
    return compareSortKeys(sortKey(left), sortKey(right));
  }

  // Sortierschlüssel werden einmal je Zelle berechnet statt bei jedem Vergleich.
  function sortKey(value) {
    const text = tableCellText(value);
    return { text, date: parseGermanDate(text), number: parseLeadingNumber(text) };
  }

  function compareSortKeys(left, right) {
    if (left.date !== null && right.date !== null) return left.date - right.date;
    if (left.number !== null && right.number !== null) return left.number - right.number;
    return textCollator.compare(left.text, right.text);
  }

  // Zellen enthalten nur selbst erzeugtes, maskiertes HTML; Tags entfernen und
  // die maskierten Zeichen zurückwandeln genügt und ist viel schneller als Parsen.
  function tableCellText(value) {
    return String(value ?? "")
      .replace(/<[^>]*>/g, " ")
      .replace(/&(amp|lt|gt|quot|#039);/g, (entity, name) => ({ amp: "&", lt: "<", gt: ">", quot: '"', "#039": "'" })[name])
      .replace(/\s+/g, " ")
      .trim();
  }

  function parseGermanDate(value) {
    const match = value.match(/^(\d{1,2})\.(\d{1,2})\.(\d{2,4})(?:,?\s+(\d{1,2}):(\d{2}))?/);
    if (!match) return null;
    const year = Number(match[3]) < 100 ? 2000 + Number(match[3]) : Number(match[3]);
    return new Date(year, Number(match[2]) - 1, Number(match[1]), Number(match[4] || 0), Number(match[5] || 0)).getTime();
  }

  function parseLeadingNumber(value) {
    const match = value.match(/^-?[\d.]+(?:,\d+)?(?=\s|$)/);
    return match ? Number(match[0].replace(/\./g, "").replace(",", ".")) : null;
  }

  async function openManager(kind, id) {
    const entity = kind === "vehicle"
      ? state.vehicles.find((vehicle) => Number(vehicle.id) === id)
      : state.buildings.find((building) => Number(building.id) === id);
    if (!entity) return;
    state.manager = {
      kind,
      id,
      entity,
      name: entity.caption || "",
      loading: true,
      saving: false,
      savingPerson: null,
      error: "",
      notice: "",
      editForm: null,
      nameInput: null,
      maxInput: null,
      maxPersonnel: "",
      dispatchInput: null,
      dispatchCenterId: "",
      dispatchOptions: [],
      personnel: [],
      personQuery: "",
      assignmentCsrf: "",
    };
    renderManager();
    if (kind === "building") {
      try {
        const html = await fetchPage(`/buildings/${id}/edit`);
        if (state.manager?.id === id && state.manager.kind === kind && !parseEditForm(html, state.manager)) {
          state.manager.error = "Das Bearbeitungsformular wurde nicht vollständig erkannt; Name und Status bleiben dennoch verfügbar.";
        }
      } catch (error) {
        if (state.manager?.id === id && state.manager.kind === kind) state.manager.error = `Leitstellenzuordnung konnte nicht geladen werden: ${error.message}`;
      } finally {
        if (state.manager?.id === id && state.manager.kind === kind) {
          state.manager.loading = false;
          renderManager();
        }
      }
      return;
    }
    try {
      const [editResult, assignmentResult] = await Promise.allSettled([
        fetchPage(`/vehicles/${id}/edit`),
        fetchPage(`/vehicles/${id}/zuweisung`),
      ]);
      if (!state.manager || state.manager.id !== id || state.manager.kind !== kind) return;
      const problems = [];
      if (editResult.status === "fulfilled") {
        if (!parseEditForm(editResult.value, state.manager)) problems.push("Fahrzeugeinstellungen wurden nicht erkannt");
      } else {
        problems.push(`Fahrzeugeinstellungen: ${editResult.reason?.message || editResult.reason}`);
      }
      if (assignmentResult.status === "fulfilled") {
        parsePersonnelPage(assignmentResult.value, state.manager);
      } else {
        problems.push(`Personalzuweisung: ${assignmentResult.reason?.message || assignmentResult.reason}`);
      }
      if (problems.length) state.manager.error = `Verwaltung wurde nur teilweise geladen: ${problems.join(" · ")}`;
    } catch (error) {
      if (state.manager) state.manager.error = `Verwaltung konnte nicht vollständig geladen werden: ${error.message}`;
    } finally {
      if (state.manager) {
        state.manager.loading = false;
        renderManager();
      }
    }
  }

  function closeManager() {
    state.manager = null;
    const element = shell.querySelector("#lssfo-manager");
    if (element) {
      element.hidden = true;
      element.innerHTML = "";
    }
  }

  async function fetchPage(url) {
    const response = await fetch(url, { credentials: "include", headers: { Accept: "text/html" } });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText} (${url})`);
    return response.text();
  }

  function parseEditForm(html, manager) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const nameSelectors = manager.kind === "vehicle"
      ? ['#vehicle_caption', 'input[name="vehicle[caption]"]', 'input[name="caption"]']
      : ['#building_caption', 'input[name="building[caption]"]', 'input[name="caption"]'];
    const nameInput = doc.querySelector(nameSelectors.join(","));
    const form = nameInput?.closest("form") || doc.querySelector("form");
    if (!form || !nameInput) return false;
    manager.editForm = form;
    manager.nameInput = nameInput;
    manager.name = nameInput.value || manager.name;
    if (manager.kind === "vehicle") {
      manager.maxInput = form.querySelector('#vehicle_personal_max, [name="vehicle[personal_max]"], [name="vehicle[max_personnel_override]"]');
      manager.maxPersonnel = manager.maxInput?.value ?? "";
    } else {
      manager.dispatchInput = form.querySelector('[name="building[leitstelle_building_id]"], #building_leitstelle_building_id');
      manager.dispatchCenterId = manager.dispatchInput?.value ?? "";
      manager.dispatchOptions = manager.dispatchInput ? [...manager.dispatchInput.options].map((option) => ({ value: option.value, label: option.textContent.trim() })) : [];
    }
    return true;
  }

  function parsePersonnelPage(html, manager) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    manager.assignmentCsrf = doc.querySelector('meta[name="csrf-token"]')?.content
      || document.querySelector('meta[name="csrf-token"]')?.content
      || "";
    const rows = [...doc.querySelectorAll("tbody tr")].filter((row) => row.id.startsWith("personal_") || row.querySelector("[personal_id]"));
    manager.personnel = rows.map((row, index) => {
      const assignedButton = row.querySelector("a.btn-assigned");
      const assignButton = row.querySelector("a.btn-success");
      const actionButton = assignedButton || assignButton;
      const id = Number(actionButton?.getAttribute("personal_id") || row.id.replace(/\D/g, "")) || index + 1;
      let keys = [];
      try { keys = JSON.parse(row.dataset.filterableBy || "[]"); } catch { keys = []; }
      for (const element of row.querySelectorAll("[data-education-key]")) keys.push(element.dataset.educationKey);
      keys = [...new Set(keys.filter(Boolean))];
      const cells = [...row.querySelectorAll("td")];
      const name = cells[0]?.textContent?.trim() || `Person ${id}`;
      const assigned = Boolean(assignedButton);
      // Gebunden an ein anderes Fahrzeug: Fahrzeuglink in der Zeile, der nicht auf dieses Fahrzeug zeigt.
      const vehicleLink = [...row.querySelectorAll('a[href*="/vehicles/"]')]
        .map((anchor) => ({ anchor, match: (anchor.getAttribute("href") || "").match(/\/vehicles\/(\d+)\/?$/) }))
        .find((entry) => entry.match && Number(entry.match[1]) !== Number(manager.id));
      let boundTo = vehicleLink ? { id: Number(vehicleLink.match[1]), caption: vehicleLink.anchor.textContent.trim() || `Fahrzeug ${vehicleLink.match[1]}` } : null;
      // Ohne Link: Text der Spalte „Zugewiesen an“ (letzte Spalte, ohne Schaltflächen).
      const statusPattern = /^(verfügbar|frei\b|im fahrzeug|im unterricht|im einsatz|nicht verfügbar|in ausbildung)/i;
      const lastCell = cells.length >= 4 ? cells[cells.length - 1] : null;
      if (!boundTo && !assigned && lastCell?.querySelector("a.btn, button, [personal_id]")) {
        const cell = lastCell.cloneNode(true);
        cell.querySelectorAll("a, button").forEach((element) => element.remove());
        const caption = cell.textContent.replace(/\s+/g, " ").trim();
        if (caption && !statusPattern.test(caption)) boundTo = { id: null, caption };
      }
      const statusText = cells.slice(1).map((cell) => cell.textContent.replace(/\s+/g, " ").trim())
        .find((text) => statusPattern.test(text)) || "";
      return {
        id,
        name,
        keys,
        assigned,
        boundTo: assigned ? null : boundTo,
        status: /unterricht|ausbildung/i.test(statusText) ? "training" : /im fahrzeug|im einsatz|nicht verfügbar/i.test(statusText) ? "busy" : "free",
        statusText,
        actionHref: actionButton?.getAttribute("href") || "",
        available: Boolean(actionButton),
      };
    });
  }

  function renderManager() {
    const element = shell.querySelector("#lssfo-manager");
    const manager = state.manager;
    if (!manager) {
      element.hidden = true;
      return;
    }
    element.hidden = false;
    const analyzed = manager.kind === "vehicle" ? state.analyzed.find((vehicle) => vehicle.id === manager.id) : null;
    const requiredKeys = analyzed?.training.map((item) => item.key) || [];
    const assignedCount = manager.personnel.filter((person) => person.assigned).length;
    const personnelCapacity = manager.kind === "vehicle"
      ? Core.targetCrew(manager.entity, state.vehicleTypes[String(manager.entity.vehicle_type)], "max")
      : 0;
    const maxField = manager.kind === "vehicle" && manager.maxInput
      ? `<label>Maximale Besatzung<input id="lssfo-manager-max" type="number" min="0" max="${analyzed?.staffMax || 99}" value="${escapeHtml(manager.maxPersonnel)}"><small>0 bedeutet: Standardwert des Fahrzeugtyps</small></label>`
      : "";
    const dispatchField = manager.kind === "building" && manager.dispatchInput
      ? `<label>Leitstelle<select id="lssfo-manager-dispatch">${manager.dispatchOptions.map((option) => `<option value="${escapeHtml(option.value)}"${String(option.value) === String(manager.dispatchCenterId) ? " selected" : ""}>${escapeHtml(option.label || "Ohne Leitstelle")}</option>`).join("")}</select><small>Die Zuordnung wird über das originale LSS-Bearbeitungsformular gespeichert.</small></label>`
      : "";
    const buildingStatusField = manager.kind === "building"
      ? `<div class="lssfo-building-status-card"><span>Status der Wache</span><strong>${manager.entity.enabled !== false ? badge("aktiv", "ok") : badge("inaktiv", "warn")}</strong><button type="button" class="lssfo-btn lssfo-btn-small" data-action="building-status-toggle" data-building-id="${manager.id}"${state.buildingStatusSaving !== null ? " disabled" : ""}>${state.buildingStatusSaving === manager.id ? "Bitte warten …" : manager.entity.enabled !== false ? "Wache deaktivieren" : "Wache aktivieren"}</button><small>Inaktive Wachen werden vom Spiel bei der Einsatzgenerierung anders berücksichtigt.</small></div>`
      : "";
    const personnelSection = manager.kind === "vehicle"
      ? `<section class="lssfo-manager-section">
          <div class="lssfo-section-heading">
            <div><h3>Mannschaft zuweisen</h3><p>${assignedCount} von ${personnelCapacity} Personen zugewiesen · Zugewiesene Personen stehen zuerst</p></div>
            <label class="lssfo-manager-search">⌕ <input id="lssfo-manager-person-search" type="search" value="${escapeHtml(manager.personQuery)}" placeholder="Name oder Ausbildung suchen …"></label>
          </div>
          ${manager.loading ? '<div class="lssfo-empty lssfo-empty-small"><span class="lssfo-spinner"></span> Personal wird geladen …</div>' : renderPersonnelTable(manager, requiredKeys, personnelCapacity)}
        </section>`
      : "";
    const buildingVehicles = manager.kind === "building"
      ? state.analyzed.filter((vehicle) => vehicle.buildingId === manager.id)
        .sort((a, b) => Number(b.missingCrew > 0 || b.missingTraining > 0) - Number(a.missingCrew > 0 || a.missingTraining > 0)
          || a.caption.localeCompare(b.caption, "de", { numeric: true }))
      : [];
    const buildingMissingCount = buildingVehicles.filter((vehicle) => vehicle.missingCrew > 0 || vehicle.missingTraining > 0).length;
    const buildingVehicleSection = manager.kind === "building"
      ? `<section class="lssfo-manager-section">
          <div class="lssfo-section-heading"><div><h3>Fahrzeuge dieser Wache</h3><p>${buildingVehicles.length} stationiert · ${buildingMissingCount ? `${buildingMissingCount} mit Fehlbedarf` : "alle vollständig"}</p></div></div>
          ${buildingVehicles.length ? `<div class="lssfo-station-vehicles">${buildingVehicles.map((vehicle) => {
            const missingCrew = Number(vehicle.missingCrew || 0);
            const missingTraining = Number(vehicle.missingTraining || 0);
            const hasMissing = missingCrew > 0 || missingTraining > 0;
            const status = missingCrew > 0 ? `${missingCrew} Besatzung fehlt` : missingTraining > 0 ? `${missingTraining} Ausbildung fehlt` : "vollständig";
            return `<article class="${hasMissing ? "has-missing" : "is-complete"}"><div><a href="/vehicles/${vehicle.id}/zuweisung" target="_blank" rel="noopener">${escapeHtml(vehicle.caption)}</a><span>${escapeHtml(vehicle.typeCaption)} · ${vehicle.assigned}/${vehicle.target} Personen</span></div><div><b>${escapeHtml(status)}</b><button type="button" class="lssfo-btn lssfo-btn-small" data-action="manage-vehicle" data-id="${vehicle.id}">Besatzung ändern</button></div></article>`;
          }).join("")}</div>` : '<div class="lssfo-empty lssfo-empty-small">Keine Fahrzeuge an dieser Wache gefunden.</div>'}
        </section>`
      : "";
    const buildingExtensions = manager.kind === "building"
      ? (state.operationalModel?.extensions || []).filter((entry) => entry.buildingId === manager.id)
      : [];
    const buildingPlanningSection = manager.kind === "building"
      ? `<section class="lssfo-manager-section"><div class="lssfo-section-heading"><div><h3>Ausbauten und Personal</h3><p>${buildingExtensions.length ? `${buildingExtensions.filter((entry) => entry.status === "active").length} aktiv · ${buildingExtensions.filter((entry) => entry.status === "inactive").length} inaktiv · ${buildingExtensions.filter((entry) => entry.status === "building").length} im Bau` : "Keine Ausbauinformationen vorhanden"}</p></div></div><div class="lssfo-extension-chip-list">${buildingExtensions.map((entry) => `<span class="lssfo-extension-chip ${entry.status}">${escapeHtml(entry.caption)} · ${entry.status === "building" ? relativeTime(entry.availableAt) : entry.status === "inactive" ? "inaktiv" : entry.status === "missing" ? "fehlt" : "aktiv"}</span>`).join("") || '<span class="lssfo-muted">Keine Einträge</span>'}</div><div class="lssfo-edit-actions"><a class="lssfo-btn" href="/buildings/${manager.id}" target="_blank" rel="noopener">Wache öffnen</a><a class="lssfo-btn" href="/buildings/${manager.id}/personals" target="_blank" rel="noopener">Personal</a></div></section>`
      : "";
    element.innerHTML = `<div class="lssfo-manager-backdrop" data-action="manager-close"></div>
      <aside class="lssfo-manager-card" role="dialog" aria-modal="true" aria-label="${manager.kind === "vehicle" ? "Fahrzeug" : "Wache"} bearbeiten">
        <header class="lssfo-manager-header">
          <div><span>${manager.kind === "vehicle" ? "FAHRZEUGVERWALTUNG" : "WACHENVERWALTUNG"}</span><h2>${escapeHtml(manager.name)}</h2></div>
          <button type="button" class="lssfo-icon-btn" data-action="manager-close" aria-label="Verwaltung schließen">${icon("close")}</button>
        </header>
        <div class="lssfo-manager-body">
          ${manager.error ? `<div class="lssfo-status error">${escapeHtml(manager.error)}</div>` : ""}
          ${manager.notice ? `<div class="lssfo-status success">${escapeHtml(manager.notice)}</div>` : ""}
          <section class="lssfo-manager-section">
            <div class="lssfo-section-heading"><div><h3>Stammdaten</h3><p>${manager.kind === "vehicle" ? "Name und Fahrzeugeinstellungen bearbeiten" : "Name der Wache bearbeiten"}</p></div></div>
            <div class="lssfo-edit-grid">
              <label>Name<input id="lssfo-manager-name" type="text" maxlength="120" value="${escapeHtml(manager.name)}"></label>
              ${maxField}
              ${dispatchField}
              ${buildingStatusField}
              <div class="lssfo-edit-actions">
                <button type="button" class="lssfo-btn lssfo-btn-primary" data-action="manager-save" ${manager.loading || manager.saving ? "disabled" : ""}>${manager.saving ? "Speichert …" : "Änderungen speichern"}</button>
                <a class="lssfo-btn" href="/${manager.kind === "vehicle" ? "vehicles" : "buildings"}/${manager.id}/edit" target="_blank" rel="noopener">Alle Spieleinstellungen ↗</a>
              </div>
            </div>
          </section>
          ${buildingPlanningSection}
          ${buildingVehicleSection}
          ${personnelSection}
        </div>
      </aside>`;
  }

  function personStatusLabel(person) {
    if (person.assigned) return "zugewiesen";
    if (person.status === "training") return person.statusText || "im Unterricht";
    if (person.boundTo) return `an ${person.boundTo.caption}`;
    if (person.status === "busy") return person.statusText;
    return "verfügbar";
  }

  function personStatusCell(person) {
    if (person.assigned) return badge("zugewiesen", "ok");
    const extra = person.status === "training" || (person.status === "busy" && !person.boundTo)
      ? ` <small class="lssfo-muted">${escapeHtml(person.statusText)}</small>` : "";
    if (person.boundTo) {
      const target = person.boundTo.id
        ? `<a href="/vehicles/${person.boundTo.id}" target="_blank" rel="noopener">${escapeHtml(person.boundTo.caption)}</a>`
        : escapeHtml(person.boundTo.caption);
      return `${badge("anderes Fahrzeug", "warn")} <small>${target}</small>${extra}`;
    }
    if (person.status === "training") return `${badge("im Unterricht", "neutral")}${extra}`;
    if (person.status === "busy") return /nicht verfügbar/i.test(person.statusText) ? badge("nicht verfügbar", "neutral") : `${badge("unterwegs", "neutral")}${extra}`;
    return '<span class="lssfo-muted">verfügbar</span>';
  }

  function renderPersonnelTable(manager, requiredKeys, personnelCapacity) {
    if (!manager.personnel.length) return '<div class="lssfo-empty lssfo-empty-small">Kein zuweisbares Personal an dieser Wache gefunden.</div>';
    const targetFull = manager.personnel.filter((person) => person.assigned).length >= personnelCapacity;
    const matchesTraining = (person) => !requiredKeys.length || requiredKeys.some((key) => person.keys.includes(key));
    const selectedSort = state.sorts.personnel;
    // Zuerst zugewiesen, dann frei, dann an andere Fahrzeuge gebunden, zuletzt in Ausbildung.
    const personRank = (person) => (person.assigned ? 0 : person.status === "training" ? 3 : person.boundTo ? 2 : 1);
    const sortedPersonnel = [...manager.personnel].sort((a, b) => {
      const assignedOrder = personRank(a) - personRank(b);
      if (assignedOrder) return assignedOrder;
      if (selectedSort) {
        const personValues = (person) => [
          person.name,
          person.keys.length ? person.keys.map(trainingName).join(", ") : "Keine Ausbildung",
          personStatusLabel(person),
          person.assigned ? "Entfernen" : "Zuweisen",
        ];
        const compared = compareTableValues(personValues(a)[selectedSort.column], personValues(b)[selectedSort.column]);
        if (compared) return selectedSort.direction === "desc" ? -compared : compared;
      }
      const trainingOrder = Number(matchesTraining(b)) - Number(matchesTraining(a));
      if (trainingOrder) return trainingOrder;
      return a.name.localeCompare(b.name, "de", { sensitivity: "base" });
    });
    const rows = sortedPersonnel.map((person) => {
      const educationText = person.keys.length ? person.keys.map(trainingName).join(", ") : "Keine Ausbildung";
      const matches = matchesTraining(person);
      const disabled = !person.available || manager.savingPerson !== null || (!person.assigned && targetFull);
      const action = person.assigned ? "Entfernen" : "Zuweisen";
      const hidden = manager.personQuery && !`${person.name} ${educationText}`.toLocaleLowerCase("de").includes(manager.personQuery);
      return `<tr data-person-row data-search="${escapeHtml(`${person.name} ${educationText}`.toLocaleLowerCase("de"))}"${hidden ? " hidden" : ""}>
        <td><strong>${escapeHtml(person.name)}</strong></td>
        <td>${escapeHtml(educationText)} ${matches && requiredKeys.length ? badge("passend", "ok") : ""}</td>
        <td>${personStatusCell(person)}</td>
        <td><button type="button" class="lssfo-btn lssfo-btn-small${person.assigned ? " lssfo-btn-danger" : ""}" data-action="person-toggle" data-person-id="${person.id}" ${disabled ? "disabled" : ""}${person.boundTo ? ` title="Wird von ${escapeHtml(person.boundTo.caption)} abgezogen"` : ""}>${manager.savingPerson === person.id ? "Bitte warten …" : person.boundTo ? "Umsetzen" : action}</button></td>
      </tr>`;
    }).join("");
    return `<div class="lssfo-table-wrap lssfo-personnel-table"><table><thead><tr>${sortableHeaders(["Person", "Ausbildungen", "Status", "Aktion"], "personnel")}</tr></thead><tbody>${rows}</tbody></table></div>`;
  }

  async function saveManager() {
    const manager = state.manager;
    if (!manager || manager.saving) return;
    const name = shell.querySelector("#lssfo-manager-name")?.value.trim();
    if (!name) {
      manager.error = "Der Name darf nicht leer sein.";
      renderManager();
      return;
    }
    const maxValue = manager.maxInput
      ? (shell.querySelector("#lssfo-manager-max")?.value ?? manager.maxPersonnel)
      : "";
    const dispatchValue = manager.dispatchInput ? (shell.querySelector("#lssfo-manager-dispatch")?.value ?? manager.dispatchCenterId) : "";
    manager.name = name;
    if (manager.maxInput) manager.maxPersonnel = maxValue;
    if (manager.dispatchInput) manager.dispatchCenterId = dispatchValue;
    manager.error = "";
    manager.notice = "";
    manager.saving = true;
    renderManager();
    try {
      if (manager.editForm) {
        manager.nameInput.value = name;
        if (manager.maxInput) manager.maxInput.value = maxValue;
        if (manager.dispatchInput) manager.dispatchInput.value = dispatchValue;
        await submitParsedForm(manager.editForm);
      } else {
        await submitDirectRename(manager, name);
      }
      manager.entity.caption = name;
      if (manager.kind === "building" && manager.dispatchInput) manager.entity.leitstelle_building_id = dispatchValue ? Number(dispatchValue) : null;
      if (manager.kind === "vehicle" && manager.maxInput) {
        const max = Number(manager.maxPersonnel);
        manager.entity.max_personnel_override = max > 0 ? max : null;
      }
      analyze();
      render();
      void persistCurrentCache();
      manager.notice = "Änderungen wurden gespeichert.";
    } catch (error) {
      manager.error = `Speichern fehlgeschlagen: ${error.message}`;
    } finally {
      manager.saving = false;
      renderManager();
    }
  }

  async function submitParsedForm(form, extraEntries = []) {
    const body = new URLSearchParams();
    for (const [key, value] of new FormData(form).entries()) {
      if (typeof value === "string") body.append(key, value);
    }
    for (const [key, value] of extraEntries) body.append(key, value);
    const csrf = form.querySelector('input[name="authenticity_token"]')?.value
      || document.querySelector('meta[name="csrf-token"]')?.content
      || "";
    const action = new URL(form.getAttribute("action") || location.href, location.origin).href;
    const response = await fetch(action, {
      method: (form.getAttribute("method") || "post").toUpperCase(),
      credentials: "include",
      redirect: "follow",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "X-CSRF-Token": csrf,
        "X-Requested-With": "XMLHttpRequest",
      },
      body,
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return response;
  }

  async function submitDirectRename(manager, name) {
    if (manager.kind !== "building") throw new Error("Das Bearbeitungsformular des Fahrzeugs wurde nicht erkannt.");
    const csrf = document.querySelector('meta[name="csrf-token"]')?.content || "";
    if (!csrf) throw new Error("Sicherheitsschlüssel der Spielseite wurde nicht gefunden.");
    const body = new URLSearchParams({
      utf8: "✓",
      _method: "put",
      authenticity_token: csrf,
      "building[name]": name,
    });
    const response = await fetch(`/buildings/${manager.id}`, {
      method: "POST",
      credentials: "include",
      redirect: "follow",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        "X-CSRF-Token": csrf,
        "X-Requested-With": "XMLHttpRequest",
      },
      body,
    });
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  }

  async function toggleBuildingStatus(buildingId) {
    const building = state.buildings.find((entry) => Number(entry.id) === buildingId);
    if (!building || state.buildingStatusSaving !== null) return;
    const wasEnabled = building.enabled !== false;
    state.buildingStatusSaving = buildingId;
    state.error = "";
    if (state.manager?.kind === "building" && state.manager.id === buildingId) {
      state.manager.error = "";
      state.manager.notice = "";
      renderManager();
    }
    renderContent();
    try {
      const response = await fetch(`/buildings/${buildingId}/active`, {
        method: "GET",
        credentials: "include",
        redirect: "follow",
        headers: { "X-Requested-With": "XMLHttpRequest" },
      });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      building.enabled = !wasEnabled;
      analyze();
      void persistCurrentCache();
      if (state.manager?.kind === "building" && state.manager.id === buildingId) {
        state.manager.notice = `Die Wache wurde ${building.enabled ? "aktiviert" : "deaktiviert"}.`;
      }
    } catch (error) {
      const message = `Statusänderung fehlgeschlagen: ${error.message}`;
      if (state.manager?.kind === "building" && state.manager.id === buildingId) state.manager.error = message;
      else state.error = message;
    } finally {
      state.buildingStatusSaving = null;
      render();
      if (state.manager) renderManager();
    }
  }

  async function togglePersonnel(personId) {
    const manager = state.manager;
    const person = manager?.personnel.find((entry) => entry.id === personId);
    if (!manager || !person || !person.actionHref || manager.savingPerson !== null) return;
    manager.savingPerson = personId;
    manager.error = "";
    manager.notice = "";
    renderManager();
    try {
      const response = await fetch(new URL(person.actionHref, location.origin).href, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          "X-CSRF-Token": manager.assignmentCsrf,
          "X-Requested-With": "XMLHttpRequest",
        },
      });
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      const previous = person.boundTo?.id ? state.scans[String(person.boundTo.id)] : null;
      if (previous && !person.assigned) {
        previous.assignedRows = Math.max(0, (previous.assignedRows || 0) - 1);
        for (const key of person.keys) previous.counts[key] = Math.max(0, (previous.counts[key] || 0) - 1);
        const source = state.vehicles.find((vehicle) => Number(vehicle.id) === person.boundTo.id);
        if (source) source.assigned_personnel_count = Math.max(0, Number(source.assigned_personnel_count || 0) - 1);
      }
      const html = await fetchPage(`/vehicles/${manager.id}/zuweisung`);
      parsePersonnelPage(html, manager);
      const assigned = manager.personnel.filter((entry) => entry.assigned);
      manager.entity.assigned_personnel_count = assigned.length;
      const counts = {};
      for (const entry of assigned) for (const key of entry.keys) counts[key] = (counts[key] || 0) + 1;
      state.scans[String(manager.id)] = { counts, assignedRows: assigned.length, scannedAt: Date.now() };
      analyze();
      render();
      void persistCurrentCache();
      manager.notice = person.assigned ? `${person.name} wurde vom Fahrzeug entfernt.` : `${person.name} wurde dem Fahrzeug zugewiesen.`;
    } catch (error) {
      manager.error = `Personaländerung fehlgeschlagen: ${error.message}`;
    } finally {
      manager.savingPerson = null;
      renderManager();
    }
  }

  async function scanEducations() {
    const candidates = state.analyzed.filter((vehicle) => vehicle.training.length > 0);
    if (!candidates.length) {
      state.error = "Es wurden keine Fahrzeuge mit Ausbildungsanforderung gefunden.";
      render();
      return;
    }
    const controller = new AbortController();
    state.scanController = controller;
    state.error = "";
    render();
    // Eine Abfrage je Wache statt je Fahrzeug: Die Personalliste der Wache zeigt bei
    // jeder Person das gebundene Fahrzeug. Die Zuweisungsseite eines Fahrzeugs ist
    // deutlich langsamer und wird nur noch als Rückfallebene genutzt.
    const byBuilding = new Map();
    for (const vehicle of candidates) {
      if (!byBuilding.has(vehicle.buildingId)) byBuilding.set(vehicle.buildingId, []);
      byBuilding.get(vehicle.buildingId).push(vehicle);
    }
    const buildings = [...byBuilding.entries()];
    const fallback = [];
    let done = 0;
    let sinceAnalyze = 0;
    const progress = (label) => {
      state.scanProgress = `Ausbildungen werden geprüft: ${done} / ${buildings.length} Wachen · ${label}`;
      renderStatus();
    };
    const scanBuilding = async ([buildingId, vehicles]) => {
      const caption = vehicles[0].buildingCaption || `Wache ${buildingId}`;
      const response = await fetch(`/buildings/${buildingId}/personals`, { credentials: "include", signal: controller.signal });
      if (!response.ok) throw new Error(`${response.status} bei ${caption}`);
      const html = await response.text();
      const scan = parseBuildingAssignments(html);
      state.personnelScans[String(buildingId)] = scan.station;
      for (const vehicle of vehicles) {
        const assigned = scan.vehicles.get(Number(vehicle.id));
        const expected = Number(vehicle.assigned ?? 0);
        // Keine Fahrzeugspalte gefunden, aber laut API ist Personal zugewiesen → Zuweisungsseite nutzen.
        if (!assigned && (!scan.hasVehicleColumn || expected > 0)) fallback.push(vehicle);
        else state.scans[String(vehicle.id)] = assigned || { counts: {}, assignedRows: 0, scannedAt: Date.now() };
      }
      done += 1;
      sinceAnalyze += 1;
      if (sinceAnalyze >= 10) {
        sinceAnalyze = 0;
        analyze();
      }
      progress(caption);
    };
    try {
      progress("Start");
      await runLimited(buildings, 3, async (entry) => {
        if (controller.signal.aborted) return;
        await scanBuilding(entry);
        await delay(80, controller.signal);
      });
      for (let index = 0; index < fallback.length; index += 1) {
        if (controller.signal.aborted) break;
        const vehicle = fallback[index];
        state.scanProgress = `Einzelprüfung: ${index + 1} / ${fallback.length} · ${vehicle.caption}`;
        renderStatus();
        const response = await fetch(`/vehicles/${vehicle.id}/zuweisung`, { credentials: "include", signal: controller.signal });
        if (!response.ok) throw new Error(`${response.status} bei Fahrzeug ${vehicle.id}`);
        state.scans[String(vehicle.id)] = parseAssignedEducations(await response.text(), vehicle.id);
      }
      state.tab = "training";
    } catch (error) {
      if (error.name !== "AbortError") state.error = `Ausbildungsprüfung abgebrochen: ${error.message}`;
    } finally {
      state.scanController = null;
      state.scanProgress = null;
      analyze();
      render();
    }
  }

  function stopScan() {
    state.scanController?.abort();
  }

  async function scanStationPersonnel() {
    if (state.personnelScanController) return;
    const candidates = (state.operationalModel?.stationBuildings || []).filter((building) => building.vehicles.length || Number(building.personal_count || 0) > 0);
    if (!candidates.length) {
      state.error = "Es wurden keine Wachen mit Personal gefunden.";
      render();
      return;
    }
    const controller = new AbortController();
    state.personnelScanController = controller;
    state.error = "";
    renderContent();
    try {
      for (let index = 0; index < candidates.length; index += 1) {
        if (controller.signal.aborted) break;
        const building = candidates[index];
        state.scanProgress = `Personal wird geprüft: ${index + 1} / ${candidates.length} · ${building.caption}`;
        renderStatus();
        const response = await fetch(`/buildings/${building.id}/personals`, { credentials: "include", signal: controller.signal });
        if (!response.ok) throw new Error(`${response.status} bei ${building.caption}`);
        state.personnelScans[String(building.id)] = parseStationPersonnel(await response.text());
        analyze();
        if (index + 1 < candidates.length) await delay(180, controller.signal);
      }
    } catch (error) {
      if (error.name !== "AbortError") state.error = `Personalprüfung abgebrochen: ${error.message}`;
    } finally {
      state.personnelScanController = null;
      state.scanProgress = null;
      analyze();
      render();
    }
  }

  function parseStationPersonnel(source) {
    const doc = typeof source === "string" ? new DOMParser().parseFromString(source, "text/html") : source;
    const rows = [...doc.querySelectorAll("#personal_table tbody tr, tbody tr[data-filterable-by]")];
    const counts = {};
    const names = {};
    let available = 0;
    let inTraining = 0;
    let withoutEducation = 0;
    for (const row of rows) {
      let keys = [];
      try { keys = JSON.parse(row.dataset.filterableBy || "[]"); } catch { keys = []; }
      for (const element of row.querySelectorAll("[data-education-key]")) keys.push(element.dataset.educationKey);
      keys = [...new Set(keys.filter(Boolean))];
      const cells = row.querySelectorAll("td");
      const name = cells[1]?.textContent?.trim() || cells[0]?.textContent?.trim() || "Unbekannt";
      const status = [...cells].map((cell) => cell.textContent.trim()).join(" ");
      if (/unterricht|lehrgang/i.test(status)) inTraining += 1;
      else if (/verfügbar|available/i.test(status)) available += 1;
      if (!keys.length) withoutEducation += 1;
      for (const key of keys) {
        counts[key] = (counts[key] || 0) + 1;
        if (!names[key]) names[key] = [];
        names[key].push(name);
      }
    }
    return { counts, names, total: rows.length, available, inTraining, withoutEducation, scannedAt: Date.now() };
  }

  // Arbeitet eine Liste mit höchstens `limit` gleichzeitigen Aufgaben ab.
  async function runLimited(items, limit, worker) {
    let next = 0;
    const lanes = Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (next < items.length) {
        const item = items[next];
        next += 1;
        await worker(item);
      }
    });
    await Promise.all(lanes);
  }

  // Personalliste einer Wache: Stationsübersicht und Ausbildungen je gebundenem Fahrzeug.
  function parseBuildingAssignments(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const rows = [...doc.querySelectorAll("#personal_table tbody tr, tbody tr[data-filterable-by]")];
    const vehicles = new Map();
    let hasVehicleColumn = false;
    for (const row of rows) {
      const link = [...row.querySelectorAll('a[href*="/vehicles/"]')]
        .map((anchor) => (anchor.getAttribute("href") || "").match(/\/vehicles\/(\d+)\/?$/))
        .find(Boolean);
      if (link) hasVehicleColumn = true;
      if (!link) continue;
      let keys = [];
      try { keys = JSON.parse(row.dataset.filterableBy || "[]"); } catch { keys = []; }
      for (const element of row.querySelectorAll("[data-education-key]")) keys.push(element.dataset.educationKey);
      const vehicleId = Number(link[1]);
      if (!vehicles.has(vehicleId)) vehicles.set(vehicleId, { counts: {}, assignedRows: 0, scannedAt: Date.now() });
      const entry = vehicles.get(vehicleId);
      entry.assignedRows += 1;
      for (const key of new Set(keys.filter(Boolean))) entry.counts[key] = (entry.counts[key] || 0) + 1;
    }
    // Eine Spalte „Gebunden an“ gibt es auch, wenn gerade niemand gebunden ist (Überschrift).
    if (!hasVehicleColumn) hasVehicleColumn = [...doc.querySelectorAll("#personal_table thead th, thead th")].some((cell) => /gebunden|fahrzeug/i.test(cell.textContent || ""));
    return { station: parseStationPersonnel(doc), vehicles, hasVehicleColumn };
  }

  function parseAssignedEducations(html, vehicleId) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const rows = [...doc.querySelectorAll("tbody tr")].filter((row) => {
      if (row.querySelector("a.btn-assigned")) return true;
      const link = row.querySelector('td:nth-child(3) a[href*="/vehicles/"]');
      if (!link) return false;
      try {
        return new URL(link.href, location.origin).pathname.endsWith(`/vehicles/${vehicleId}`);
      } catch {
        return false;
      }
    });
    const counts = {};
    for (const row of rows) {
      let keys = [];
      try {
        keys = JSON.parse(row.dataset.filterableBy || "[]");
      } catch {
        keys = [];
      }
      for (const span of row.querySelectorAll("[data-education-key]")) keys.push(span.dataset.educationKey);
      for (const key of new Set(keys.filter(Boolean))) counts[key] = (counts[key] || 0) + 1;
    }
    return { counts, assignedRows: rows.length, scannedAt: Date.now() };
  }

  function delay(ms, signal) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(resolve, ms);
      signal.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(new DOMException("Abgebrochen", "AbortError"));
      }, { once: true });
    });
  }

  function detectPlannerOpener() {
    let active = new URLSearchParams(location.search).get("lssfo") === "planner";
    try {
      if (active) sessionStorage.setItem(PLANNER_SESSION_KEY, "1");
      else active = sessionStorage.getItem(PLANNER_SESSION_KEY) === "1";
    } catch { /* Ohne sessionStorage gilt nur der URL-Parameter. */ }
    try {
      return active && window.opener && !window.opener.closed ? window.opener : null;
    } catch {
      return null;
    }
  }

  function postToPlanner(message) {
    // Der Wachenplaner läuft oft als lokale Datei (Origin "null"), daher "*".
    // Empfänger ist ausschließlich das Fenster, das diesen Tab geöffnet hat.
    try { plannerOpener?.postMessage({ source: "lssfo-game", ...message }, "*"); } catch { /* Planer wurde geschlossen. */ }
  }

  function handlePlannerMessage(event) {
    if (event.source !== plannerOpener || event.data?.source !== "lssfo-planner") return;
    if (event.data.type === "lssfo-sync") void syncPlanner();
    if (event.data.type === "lssfo-build") void openBuildDialog(event.data.station);
  }

  let plannerToastTimer = 0;
  function plannerToast(message) {
    const element = plannerRoot.querySelector(".lssfo-toast");
    element.textContent = message;
    element.classList.add("is-visible");
    clearTimeout(plannerToastTimer);
    plannerToastTimer = setTimeout(() => element.classList.remove("is-visible"), 3600);
  }

  function plannerBuilding(building) {
    return { id: Number(building.id), caption: building.caption, building_type: Number(building.building_type), latitude: Number(building.latitude), longitude: Number(building.longitude) };
  }

  async function fetchFreshBuildings() {
    const result = await fetchJson(`/api/buildings?_=${Date.now()}`);
    return Array.isArray(result) ? result : result?.result || [];
  }

  function requestPlannerConsent() {
    try {
      if (sessionStorage.getItem(PLANNER_CONSENT_KEY) === "1") return Promise.resolve(true);
    } catch { /* Dann wird jedes Mal gefragt. */ }
    return new Promise((resolve) => {
      closeBuildDialog();
      state.build = { mode: "consent", resolve };
      renderBuild();
    });
  }

  async function syncPlanner() {
    if (!(await requestPlannerConsent())) {
      postToPlanner({ type: "lssfo-denied" });
      return;
    }
    try {
      const buildings = await fetchFreshBuildings();
      postToPlanner({ type: "lssfo-buildings", buildings: buildings.map(plannerBuilding) });
      plannerToast(`${formatNumber(buildings.length)} Gebäude an den Wachenplaner übertragen`);
    } catch (error) {
      plannerToast(`Abgleich fehlgeschlagen: ${error.message}`);
    }
  }

  async function openBuildDialog(station) {
    const lat = Number(station?.lat);
    const lon = Number(station?.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
    closeBuildDialog();
    const build = {
      mode: "build",
      station: {
        key: String(station.key || ""),
        name: String(station.name || "Neue Wache").slice(0, 120),
        kind: PLANNER_KINDS[station.kind] ? station.kind : "fire",
        label: String(station.label || ""),
        address: String(station.address || ""),
        district: String(station.district || ""),
      },
      lat,
      lon,
      originLat: lat,
      originLon: lon,
      name: String(station.name || "Neue Wache").slice(0, 120),
      loading: true,
      submitting: false,
      error: "",
      form: null,
      fields: {},
      typeOptions: [],
      typeValue: "",
      dispatchOptions: [],
      dispatchValue: "",
      extraSelects: [],
      submit: null,
      buildings: [],
      done: null,
    };
    state.build = build;
    renderBuild();
    const [formResult, buildingsResult] = await Promise.allSettled([fetchPage("/buildings/new"), fetchFreshBuildings()]);
    if (state.build !== build) return;
    build.buildings = buildingsResult.status === "fulfilled" ? buildingsResult.value : [];
    if (formResult.status === "fulfilled") parseBuildForm(formResult.value, build);
    if (!build.form) build.error = build.error || "Das Bauformular des Spiels wurde nicht erkannt. Nutze „Im Spielformular öffnen“.";
    build.loading = false;
    renderBuild();
  }

  function parseBuildForm(html, build) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const form = doc.querySelector("form#new_building")
      || doc.querySelector('[name="building[latitude]"]')?.closest("form")
      || doc.querySelector('form[action$="/buildings"]');
    if (!form) return;
    const field = (name) => form.querySelector(`[name="building[${name}]"]`);
    const fields = { name: field("name"), type: field("building_type"), dispatch: field("leitstelle_building_id"), lat: field("latitude"), lon: field("longitude"), address: field("address") };
    if (!fields.lat || !fields.lon || !fields.type) return;
    const buttons = [...form.querySelectorAll('input[type="submit"], button[type="submit"], button:not([type])')];
    const buttonText = (button) => `${button.name} ${button.value} ${button.className} ${button.textContent}`.toLowerCase();
    const submit = buttons.find((button) => /credit/.test(buttonText(button)) && !/coin/.test(buttonText(button)))
      || buttons.find((button) => !/coin/.test(buttonText(button)))
      || null;
    if (buttons.length && !submit) {
      build.error = "Im Bauformular wurde kein Bau-Knopf für Credits erkannt.";
      return;
    }
    const options = (select) => select?.tagName === "SELECT" ? [...select.options].map((option) => ({ value: option.value, label: option.textContent.trim() })) : [];
    build.form = form;
    build.fields = fields;
    build.submit = submit;
    build.typeOptions = options(fields.type);
    const kindMeta = PLANNER_KINDS[build.station.kind];
    const kindPattern = kindMeta.pattern;
    const exactPattern = kindMeta.exact;
    const preferredType = build.typeOptions.find((option) => exactPattern.test(option.label))
      || build.typeOptions.find((option) => option.value === kindMeta.type)
      || build.typeOptions.find((option) => kindPattern.test(option.label));
    build.typeValue = preferredType?.value ?? fields.type.value;
    build.dispatchOptions = options(fields.dispatch);
    const dispatchCenters = build.buildings.filter((building) => Number(building.building_type) === 7);
    const nearest = dispatchCenters
      .map((building) => ({ building, distance: haversineMeters(build.lat, build.lon, Number(building.latitude), Number(building.longitude)) }))
      .filter((entry) => Number.isFinite(entry.distance))
      .sort((a, b) => a.distance - b.distance)[0];
    build.dispatchValue = nearest && build.dispatchOptions.some((option) => option.value === String(nearest.building.id))
      ? String(nearest.building.id)
      : fields.dispatch?.value ?? "";
    build.extraSelects = [...form.querySelectorAll("select[name]")]
      .filter((select) => select !== fields.type && select !== fields.dispatch)
      .map((select) => ({
        name: select.name,
        label: (select.id && doc.querySelector(`label[for="${CSS.escape(select.id)}"]`)?.textContent.trim()) || select.closest(".form-group")?.querySelector("label")?.textContent.trim() || select.name,
        options: options(select),
        value: select.value,
        types: fieldBuildingTypes(select, form),
        hidden: hiddenInForm(select, form),
      }));
  }

  // Das Spielformular enthält z. B. je Wachentyp ein eigenes „Start Fahrzeug“-Feld
  // und blendet per Skript nur das passende ein. Die Zuordnung ergibt sich aus
  // Name, ID und Klassen des Feldes und seiner Umgebung.
  function fieldBuildingTypes(select, form) {
    const parts = [select.name, select.id];
    for (let node = select.parentElement; node && node !== form; node = node.parentElement) {
      parts.push(node.id, typeof node.className === "string" ? node.className : "", ...Object.values(node.dataset || {}));
    }
    const text = parts.join(" ").toLowerCase();
    const explicit = text.match(/building[_-]?type[_-]?(\d+)/);
    if (explicit) return [Number(explicit[1])];
    const small = /kleinwache|small/.test(text);
    if (/feuer|fire/.test(text)) return [small ? 18 : 0];
    if (/rettung|rescue|ambulance/.test(text)) return [small ? 20 : 2];
    if (/polizei|police/.test(text)) return [small ? 19 : 6];
    return null;
  }

  function hiddenInForm(select, form) {
    for (let node = select; node && node !== form; node = node.parentElement) {
      if (node.hidden || /display\s*:\s*none/i.test(node.getAttribute("style") || "") || /(?:^|\s)(?:hidden|d-none)(?:\s|$)/.test(typeof node.className === "string" ? node.className : "")) return true;
    }
    return false;
  }

  // Felder, die für den gewählten Gebäudetyp gelten. Nie zwei Felder mit derselben
  // Beschriftung gleichzeitig: passende Typzuordnung vor sichtbaren vor versteckten.
  function applicableExtras(build) {
    const type = Number(build.typeValue);
    const ranked = build.extraSelects
      .map((extra, index) => ({ extra, index, rank: extra.types ? 0 : extra.hidden ? 2 : 1 }))
      .filter(({ extra }) => !extra.types || extra.types.includes(type))
      .sort((a, b) => a.rank - b.rank || a.index - b.index);
    const labels = new Set();
    return ranked.filter(({ extra }) => {
      const label = extra.label.toLocaleLowerCase("de");
      if (labels.has(label)) return false;
      labels.add(label);
      return true;
    }).sort((a, b) => a.index - b.index);
  }

  function readBuildInputs() {
    const build = state.build;
    if (build?.mode !== "build") return;
    const element = plannerRoot.querySelector("#lssfo-build");
    const name = element.querySelector("#lssfo-build-name");
    if (name) build.name = name.value;
    const type = element.querySelector("#lssfo-build-type");
    if (type) build.typeValue = type.value;
    const dispatch = element.querySelector("#lssfo-build-dispatch");
    if (dispatch) build.dispatchValue = dispatch.value;
    for (const select of element.querySelectorAll("[data-build-extra]")) {
      const extra = build.extraSelects[Number(select.dataset.buildExtra)];
      if (extra) extra.value = select.value;
    }
  }

  function closeBuildDialog() {
    const build = state.build;
    if (!build) return;
    build.resolve?.(false);
    build.map?.remove();
    state.build = null;
    const element = plannerRoot.querySelector("#lssfo-build");
    element.hidden = true;
    element.innerHTML = "";
  }

  function handlePlannerClick(event) {
    const action = event.target.closest("[data-action]")?.dataset.action;
    const build = state.build;
    if (!action || !build) return;
    if (action === "consent-allow") {
      try { sessionStorage.setItem(PLANNER_CONSENT_KEY, "1"); } catch { /* Zustimmung gilt nur für diese Anfrage. */ }
      const { resolve } = build;
      build.resolve = null;
      closeBuildDialog();
      resolve(true);
    }
    if (action === "build-close" || action === "consent-deny") closeBuildDialog();
    if (action === "build-submit") void submitBuild();
    if (action === "build-native") void openNativeBuildForm();
  }

  function buildingKindMatches(building, kind) {
    const type = Number(building.building_type);
    if (kind === "hospital") return HOSPITAL_BUILDING_TYPES.has(type);
    if (kind === "police") return POLICE_BUILDING_TYPES.has(type);
    return kind === "rescue" ? RESCUE_BUILDING_TYPES.has(type) : FIRE_BUILDING_TYPES.has(type);
  }

  function renderBuild() {
    const element = plannerRoot.querySelector("#lssfo-build");
    const build = state.build;
    if (!build) {
      element.hidden = true;
      return;
    }
    build.map?.remove();
    build.map = null;
    element.hidden = false;
    const header = (kicker, title, iconHtml) => `<header class="lssfo-manager-header"><div class="lssfo-sheet-title">${iconHtml}<div><span>${escapeHtml(kicker)}</span><h2>${escapeHtml(title)}</h2></div></div><button type="button" class="lssfo-icon-btn" data-action="${build.mode === "consent" ? "consent-deny" : "build-close"}" aria-label="Schließen">${icon("close")}</button></header>`;
    const wrap = (inner) => `<div class="lssfo-manager-backdrop" data-action="${build.mode === "consent" ? "consent-deny" : "build-close"}"></div><aside class="lssfo-sheet" role="dialog" aria-modal="true">${inner}</aside>`;
    if (build.mode === "consent") {
      element.innerHTML = wrap(`${header("WACHENPLANER", "Abgleich erlauben?", `<span class="lssfo-sheet-icon" style="background:#007aff">${icon("map")}</span>`)}
        <div class="lssfo-manager-body"><p class="lssfo-sheet-text">Der Wachenplaner möchte deine Gebäude abgleichen, um anzuzeigen, welche echten Standorte du noch nicht gebaut hast. Übertragen werden nur <b>Name, Typ und Position</b> deiner Gebäude – an den Tab, der dieses Fenster geöffnet hat.</p>
        <div class="lssfo-sheet-actions"><button type="button" class="lssfo-btn" data-action="consent-deny">Ablehnen</button><button type="button" class="lssfo-btn lssfo-btn-primary" data-action="consent-allow">Erlauben</button></div></div>`);
      return;
    }
    const station = build.station;
    const glyph = `<span class="lssfo-sheet-icon" style="background:${PLANNER_KINDS[station.kind].color}">${icon("building")}</span>`;
    if (build.done) {
      element.innerHTML = wrap(`${header(PLANNER_KINDS[station.kind].headline, build.done.caption || station.name, glyph)}
        <div class="lssfo-manager-body lssfo-center"><div class="lssfo-success-mark">${icon("check")}</div><p class="lssfo-sheet-text"><b>${escapeHtml(build.done.caption || station.name)}</b> wurde gebaut und im Wachenplaner als erledigt markiert.</p>
        <div class="lssfo-sheet-actions" style="justify-content:center"><a class="lssfo-btn" href="/buildings/${Number(build.done.id)}" target="_blank" rel="noopener">Wache öffnen ${icon("external")}</a><button type="button" class="lssfo-btn lssfo-btn-primary" data-action="build-close">Fertig</button></div></div>`);
      return;
    }
    if (build.loading) {
      element.innerHTML = wrap(`${header("WACHE BAUEN", station.name, glyph)}<div class="lssfo-manager-body"><div class="lssfo-empty lssfo-empty-small"><span class="lssfo-spinner"></span> Bauformular wird geladen …</div></div>`);
      return;
    }
    const nearby = build.buildings
      .filter((building) => buildingKindMatches(building, station.kind))
      .map((building) => ({ building, distance: haversineMeters(build.lat, build.lon, Number(building.latitude), Number(building.longitude)) }))
      .filter((entry) => entry.distance <= 400)
      .sort((a, b) => a.distance - b.distance)[0];
    const selectHtml = (id, options, value, extra = "") => `<select id="${id}"${extra}>${options.map((option) => `<option value="${escapeHtml(option.value)}"${String(option.value) === String(value) ? " selected" : ""}>${escapeHtml(option.label || "–")}</option>`).join("")}</select>`;
    const typeField = build.typeOptions.length ? `<label>Gebäudetyp${selectHtml("lssfo-build-type", build.typeOptions, build.typeValue)}</label>` : "";
    const dispatchField = build.dispatchOptions.length ? `<label>Leitstelle${selectHtml("lssfo-build-dispatch", build.dispatchOptions, build.dispatchValue)}</label>` : "";
    const extras = applicableExtras(build).filter(({ extra }) => extra.options.length > 1);
    const extraFields = extras.length
      ? `<details class="lssfo-build-more"${build.moreOpen ? " open" : ""}><summary>Weitere Optionen</summary><div>${extras.map(({ extra, index }) => `<label>${escapeHtml(extra.label)}${selectHtml(`lssfo-build-extra-${index}`, extra.options, extra.value, ` data-build-extra="${index}"`)}</label>`).join("")}</div></details>`
      : "";
    element.innerHTML = wrap(`${header(`WACHE BAUEN${station.label ? ` · ${station.label.toUpperCase()}` : ""}`, station.name, glyph)}
      <div class="lssfo-manager-body">
        ${build.error ? `<div class="lssfo-status error">${escapeHtml(build.error)}</div>` : ""}
        ${nearby ? `<div class="lssfo-status warn">${icon("alert")}<span>In ${formatNumber(Math.round(nearby.distance))} m Entfernung steht bereits <b>${escapeHtml(nearby.building.caption)}</b>.</span></div>` : ""}
        <div class="lssfo-build-form">
          ${globalThis.L ? '<div id="lssfo-build-map" class="lssfo-build-map" aria-label="Bauposition – Marker kann verschoben werden"></div>' : ""}
          <div class="lssfo-build-meta"><span>Position <b id="lssfo-build-position">${build.lat.toFixed(5)}, ${build.lon.toFixed(5)}</b></span>${station.address ? `<span>Adresse <b>${escapeHtml(station.address)}</b></span>` : ""}${station.district ? `<span>Bezirk <b>${escapeHtml(station.district)}</b></span>` : ""}</div>
          ${build.form ? `<label>Name<input id="lssfo-build-name" type="text" maxlength="${Number(build.fields.name?.maxLength) > 0 ? Number(build.fields.name.maxLength) : 120}" value="${escapeHtml(build.name)}"></label>
          <div class="lssfo-build-row">${typeField}${dispatchField}</div>${extraFields}` : ""}
          <div class="lssfo-sheet-actions">
            <button type="button" class="lssfo-btn" data-action="build-native">Im Spielformular öffnen</button>
            <button type="button" class="lssfo-btn" data-action="build-close">Abbrechen</button>
            ${build.form ? `<button type="button" class="lssfo-btn lssfo-btn-primary" data-action="build-submit"${build.submitting ? " disabled" : ""}>${build.submitting ? '<span class="lssfo-spinner"></span> Wird gebaut …' : "Mit Credits bauen"}</button>` : ""}
          </div>
        </div>
      </div>`);
    initializeBuildMap(build);
  }

  function initializeBuildMap(build) {
    const Leaflet = globalThis.L;
    const container = plannerRoot.querySelector("#lssfo-build-map");
    if (!Leaflet || !container) return;
    const map = Leaflet.map(container, { zoomControl: false, attributionControl: false }).setView([build.lat, build.lon], 16);
    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19 }).addTo(map);
    if (build.lat !== build.originLat || build.lon !== build.originLon) {
      Leaflet.circleMarker([build.originLat, build.originLon], { radius: 5, color: "#8e8e93", fillOpacity: .6, weight: 1 }).addTo(map);
    }
    const marker = Leaflet.marker([build.lat, build.lon], {
      draggable: true,
      icon: Leaflet.divIcon({ className: "", html: `<div style="width:26px;height:26px;border:3px solid #fff;border-radius:50%;background:${PLANNER_KINDS[build.station.kind].color};box-shadow:0 3px 10px rgba(0,0,0,.35)"></div>`, iconSize: [26, 26], iconAnchor: [13, 13] }),
    }).addTo(map);
    marker.on("dragend", () => {
      const position = marker.getLatLng();
      build.lat = position.lat;
      build.lon = position.lng;
      const shift = haversineMeters(build.originLat, build.originLon, build.lat, build.lon);
      const label = plannerRoot.querySelector("#lssfo-build-position");
      if (label) label.textContent = `${build.lat.toFixed(5)}, ${build.lon.toFixed(5)}${shift >= 5 ? ` · ${formatNumber(Math.round(shift))} m verschoben` : ""}`;
    });
    build.map = map;
    setTimeout(() => map.invalidateSize(), 60);
  }

  async function submitBuild() {
    const build = state.build;
    if (!build?.form || build.submitting) return;
    readBuildInputs();
    if (!build.name.trim()) {
      build.error = "Bitte einen Namen eingeben.";
      renderBuild();
      return;
    }
    build.submitting = true;
    build.error = "";
    renderBuild();
    try {
      const { form, fields } = build;
      if (fields.name) fields.name.value = build.name.trim();
      if (fields.type && build.typeValue !== "") fields.type.value = build.typeValue;
      if (fields.dispatch) fields.dispatch.value = build.dispatchValue;
      fields.lat.value = build.lat.toFixed(7);
      fields.lon.value = build.lon.toFixed(7);
      if (fields.address && build.station.address) fields.address.value = build.station.address;
      // Nur die Felder des gewählten Typs mitsenden; deaktivierte Felder lässt FormData weg.
      const applicable = new Set(applicableExtras(build).map(({ extra }) => extra.name));
      for (const extra of build.extraSelects) {
        const select = form.querySelector(`select[name="${CSS.escape(extra.name)}"]`);
        if (!select) continue;
        select.disabled = !applicable.has(extra.name);
        select.value = extra.value;
      }
      const knownIds = new Set(build.buildings.map((building) => Number(building.id)));
      const response = await submitParsedForm(form, build.submit?.name ? [[build.submit.name, build.submit.value || "1"]] : []);
      const responseText = await response.text();
      const created = await findCreatedBuilding(knownIds, build.lat, build.lon);
      if (!created) throw new Error(formErrorText(responseText) || "Das Spiel hat keine neue Wache bestätigt. Prüfe deine Credits oder nutze „Im Spielformular öffnen“.");
      if (state.build !== build) return;
      build.done = created;
      postToPlanner({ type: "lssfo-built", stationKey: build.station.key, building: plannerBuilding(created) });
      if (state.buildings.length) {
        state.buildings.push(created);
        analyze();
        if (state.open) render();
        void persistCurrentCache();
      }
    } catch (error) {
      build.error = `Bauen fehlgeschlagen: ${error.message}`;
    } finally {
      build.submitting = false;
      if (state.build === build) renderBuild();
    }
  }

  async function findCreatedBuilding(knownIds, lat, lon) {
    for (const wait of [400, 1200, 2500]) {
      await new Promise((resolve) => setTimeout(resolve, wait));
      const created = (await fetchFreshBuildings().catch(() => []))
        .find((building) => !knownIds.has(Number(building.id)) && haversineMeters(lat, lon, Number(building.latitude), Number(building.longitude)) <= 250);
      if (created) return created;
    }
    return null;
  }

  function formErrorText(html) {
    const doc = new DOMParser().parseFromString(html || "", "text/html");
    const text = [...doc.querySelectorAll(".alert-danger, .alert-error, #error_explanation, .has-error .help-block, .help-block.error")]
      .map((element) => element.textContent.replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .join(" · ");
    return text.slice(0, 260);
  }

  async function openNativeBuildForm() {
    const build = state.build;
    if (build?.mode !== "build") return;
    readBuildInputs();
    const { lat, lon, name, typeValue, dispatchValue, station } = build;
    closeBuildDialog();
    if (state.open) closeDashboard();
    const trigger = document.querySelector('#build_new_building, a[href="/buildings/new"], a[href$="/buildings/new"]');
    if (!trigger) {
      try { await navigator.clipboard.writeText(`${lat.toFixed(6)}, ${lon.toFixed(6)}`); } catch { /* Kopieren ist optional. */ }
      plannerToast("Knopf „Neues Gebäude bauen“ nicht gefunden – Koordinaten wurden kopiert.");
      return;
    }
    trigger.click();
    let form = null;
    for (let attempt = 0; attempt < 40 && !form; attempt += 1) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      form = document.querySelector('[name="building[latitude]"]')?.closest("form") || null;
    }
    if (!form) {
      plannerToast("Das Spielformular wurde nicht rechtzeitig geladen.");
      return;
    }
    const setField = (fieldName, value) => {
      const field = form.querySelector(`[name="building[${fieldName}]"]`);
      if (!field || value === undefined || value === "") return;
      field.value = value;
      field.dispatchEvent(new Event("input", { bubbles: true }));
      field.dispatchEvent(new Event("change", { bubbles: true }));
    };
    setField("building_type", typeValue);
    setField("name", name);
    setField("leitstelle_building_id", dispatchValue);
    setField("latitude", lat.toFixed(7));
    setField("longitude", lon.toFixed(7));
    setField("address", station.address);
    try {
      const pageWindow = typeof unsafeWindow !== "undefined" ? unsafeWindow : null;
      pageWindow?.map?.setView?.([lat, lon], 17);
    } catch { /* Die Karte des Spiels ist optional. */ }
    form.scrollIntoView({ block: "center", behavior: "smooth" });
    plannerToast("Spielformular ausgefüllt – Position prüfen und im Spiel bauen.");
  }

  function exportCsv() {
    let headers;
    let rows;
    if (state.tab === "regions") {
      headers = ["Leitstelle", "Bundesländer", "Bezirke", "Wachen", "Fahrzeuge", "Personal", "Sollpersonal", "Personal fehlt", "Ausbildung fehlt", "Bereitschaft"];
      rows = state.operationalModel.regions.map((item) => [item.caption, item.federalStates.join(", "), item.districts.join(", "), item.buildings.length, item.vehicles.length, item.personnel, item.targetCrew, item.missingCrew, item.missingTraining, `${item.readiness}%`]);
    } else if (state.tab === "extensions") {
      headers = ["Wache", "Typ", "Leitstelle", "Bezirk", "Ausbau", "Status", "Verfügbar ab"];
      rows = state.operationalModel.extensions.map((item) => [item.buildingCaption, item.buildingType, item.dispatchCenterCaption, item.district, item.caption, item.status, item.availableAt?.toISOString() || ""]);
    } else if (state.tab === "utilization") {
      headers = ["Fahrzeug", "Typ", "Wache", "Bezirk", "Gesamt-km", "30 Tage", "Typdurchschnitt", "Bewertung"];
      rows = state.operationalModel.utilizationRows.map((item) => [item.caption, item.typeCaption, item.buildingCaption, item.district, item.distanceTotal, item.distance30d, item.typeAverage30d, item.utilization]);
    } else if (state.tab === "personnel") {
      headers = ["Wache", "Typ", "Leitstelle", "Personal", "Fahrzeug-Soll", "Nicht zugewiesen", "Reserve", "Personal fehlt", "Zuweisung fehlt", "Ausbildung fehlt"];
      rows = state.operationalModel.personnelRows.map((item) => [item.caption, item.typeCaption, item.dispatchCenterCaption, item.personnel, item.targetCrew, item.unassigned, item.reserve, item.shortage, item.assignmentGap, item.trainingGap]);
    } else if (state.tab === "dashboard") {
      headers = ["Priorität", "Bereich", "Hinweis"];
      rows = state.operationalModel.alerts.map((item) => [item.priority, item.title, item.detail]);
    } else if (state.tab === "buildings") {
      headers = ["Wache", "Fahrzeuge", "Personal", "Zugewiesen", "Frei", "Besatzung fehlt"];
      rows = state.buildingSummary.map((item) => [item.caption, item.vehicles, item.personnel, item.assigned, item.free, item.missingCrew]);
    } else if (state.tab === "training") {
      headers = ["Ausbildung", "Bereich", "Fahrzeuge", "Benötigt", "Vorhanden", "Fehlt", "Geprüfte Fahrzeuge"];
      rows = Core.summarizeTraining(state.analyzed).map((item) => [trainingName(item.key), item.school, item.vehicles, item.required, item.actual, item.missing, item.scannedVehicles]);
    } else if (state.tab === "courses") {
      headers = ["Lehrgang", "Schule", "Status", "Beginn", "Ende", "Freie Plätze"];
      rows = courseRows().map((course) => [course.title, course.school, course.running ? "Läuft" : "Offen", course.start?.toLocaleString("de-DE") || "", course.finish?.toLocaleString("de-DE") || "", course.openSpaces ?? ""]);
    } else {
      headers = ["Fahrzeug", "Typ", "Wache", "Soll", "Zugewiesen", "Fehlt", "Ausbildung fehlt"];
      rows = state.analyzed.map((item) => [item.caption, item.typeCaption, item.buildingCaption, item.target, item.assigned, item.missingCrew, item.missingTraining]);
    }
    const csv = [headers, ...rows].map((row) => row.map(csvCell).join(";")).join("\r\n");
    const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `lss-${state.tab}-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function csvCell(value) {
    return `"${String(value ?? "").replaceAll('"', '""')}"`;
  }

  function trainingName(key) {
    for (const school of Object.values(state.schoolingTypes || {})) {
      const entry = Array.isArray(school) ? school.find((item) => item.key === key) : school?.[key];
      if (entry?.caption) return entry.caption;
      if (typeof entry === "string") return entry;
    }
    return String(key).replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  function icon(name) {
    const paths = {
      app: '<path d="M12 3 4 6v6c0 4.8 3.1 7.8 8 9 4.9-1.2 8-4.2 8-9V6l-8-3Z"/><path d="M8 9h8M8 13h8M12 7v8"/>',
      dashboard: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
      region: '<path d="M4 20V8l8-4 8 4v12"/><path d="M8 20v-5h8v5M8 9h.01M12 9h.01M16 9h.01"/>',
      extension: '<path d="M4 21v-8l5-3v11M9 21V7l5-3v17M14 21v-9l6-3v12M2 21h20"/>',
      gauge: '<path d="M4.9 19a9 9 0 1 1 14.2 0"/><path d="m12 13 4-4"/><circle cx="12" cy="13" r="1"/>',
      chevron: '<path d="m9 18 6-6-6-6"/>',
      transfer: '<path d="M17 3l4 4-4 4M3 7h18M7 21l-4-4 4-4m14 4H3"/>',
      edit: '<path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',
      vehicle: '<path d="M3 7h11v10H3z"/><path d="M14 10h3l3 3v4h-6z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
      building: '<path d="M4 21V7l8-4 8 4v14"/><path d="M8 10h2m4 0h2m-8 4h2m4 0h2M9 21v-4h6v4"/>',
      training: '<path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 12v4c3 2 7 2 10 0v-4M21 9v6"/>',
      calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18m-12 5 2 2 4-4"/>',
      map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15m6-12v15"/>',
      theme: '<path d="M12 3a9 9 0 1 0 9 9c0-1-.17-1.96-.47-2.86A7 7 0 0 1 12 3Z"/>',
      external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/>',
      refresh: '<path d="M20 11a8 8 0 1 0-2.34 5.66M20 4v7h-7"/>',
      close: '<path d="m6 6 12 12M18 6 6 18"/>',
      search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
      scan: '<path d="M9 4H6a2 2 0 0 0-2 2v14h16V6a2 2 0 0 0-2-2h-3"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="m8 13 2 2 5-5"/>',
      download: '<path d="M12 3v12m-4-4 4 4 4-4M5 21h14"/>',
      stop: '<rect x="5" y="5" width="14" height="14" rx="2"/>',
      users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
      alert: '<path d="M10.3 4.4 2.5 18a2 2 0 0 0 1.7 3h15.6a2 2 0 0 0 1.7-3L13.7 4.4a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 4h.01"/>',
      plus: '<path d="M12 5v14M5 12h14"/>',
      check: '<path d="m5 12 5 5 9-10"/>',
      sort: '<path d="m8 9 4-4 4 4M16 15l-4 4-4-4"/>',
      "sort-asc": '<path d="m7 14 5-5 5 5"/>',
      "sort-desc": '<path d="m7 10 5 5 5-5"/>',
    };
    return `<svg class="lssfo-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.app}</svg>`;
  }

  // Markenzeichen der LSS Verwaltung (gefüllte Kacheln) – gleich in Navigationsleiste und Panel-Kopf.
  function appGlyph(extraClass = "") {
    return `<svg class="lssfo-icon ${extraClass}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><rect x="3" y="3" width="8" height="10" rx="2"/><rect x="13" y="3" width="8" height="6" rx="2"/><rect x="13" y="11" width="8" height="10" rx="2"/><rect x="3" y="15" width="8" height="6" rx="2"/></svg>`;
  }

  function badge(value, tone) {
    return `<span class="lssfo-badge ${tone}">${escapeHtml(value)}</span>`;
  }

  function formatNumber(value) {
    return numberFormat.format(Number(value || 0));
  }

  function formatDate(value) {
    if (!value) return "–";
    const date = new Date(value);
    return Number.isNaN(date.valueOf()) ? escapeHtml(value) : date.toLocaleString("de-DE");
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }
})();

