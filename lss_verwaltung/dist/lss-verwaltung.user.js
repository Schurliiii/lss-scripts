// ==UserScript==
// @name         LSS Verwaltung
// @namespace    https://github.com/Schurliiii/lss-scripts
// @version      2.0.0
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
// @noframes
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
"use strict";
if (window.top !== window.self || document.documentElement.hasAttribute("data-lssfo")) return;
document.documentElement.setAttribute("data-lssfo", "2.0.0");
const LSS_STYLES = {"launcher":".lssfo-launcher-host{display:block;float:left;height:50px;margin:0;padding:0;list-style:none}.lssfo-launcher-host .lssfo-launcher{display:flex;width:44px;height:50px;align-items:center;justify-content:center;margin:0;padding:0;border:0;border-radius:0;color:#fff;background:transparent;box-shadow:none;cursor:pointer;transition:background .2s}.lssfo-launcher-host .lssfo-launcher:hover,.lssfo-launcher-host .lssfo-launcher:focus-visible{color:#fff;background:rgba(255,255,255,.14);outline:0}.lssfo-launcher > span{display:none}.lssfo-launcher > svg{display:block;width:18px;height:18px;fill:currentColor;filter:drop-shadow(0 1px 1px rgba(0,0,0,.25))}:root.lssfo-standalone .lssfo-launcher-host{display:none !important}","ui":".lssfo-root{--bg:rgba(242,242,247,.82);--panel:rgba(255,255,255,.84);--sheet:rgba(246,246,248,.94);--th:rgba(248,248,250,.95);--soft:rgba(120,120,128,.08);--strong:rgba(120,120,128,.14);--thumb:#fff;--edge:rgba(255,255,255,.7);--border:rgba(60,60,67,.18);--border-soft:rgba(60,60,67,.1);--text:#1d1d1f;--muted:rgba(60,60,67,.68);--subtle:rgba(60,60,67,.46);--primary:#007aff;--primary-soft:rgba(0,122,255,.12);--danger:#d70015;--danger-soft:rgba(255,59,48,.12);--warning:#b25f00;--warning-soft:rgba(255,149,0,.16);--success:#1f8a3b;--success-soft:rgba(52,199,89,.16);--green:#34c759;--red:#ff3b30;--orange:#ff9500;--shadow:0 24px 70px rgba(0,0,0,.2),0 2px 8px rgba(0,0,0,.08);--shadow-small:0 4px 14px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.05);--spring:cubic-bezier(.32,.72,0,1);--ease:cubic-bezier(.25,.1,.25,1);--map-bg:#e9e6df;--blur:blur(36px) saturate(180%);--font:-apple-system,BlinkMacSystemFont,\"SF Pro Text\",\"Inter\",\"Segoe UI Variable\",\"Segoe UI\",system-ui,sans-serif;color:var(--text);color-scheme:light;font:14px/1.4 var(--font);letter-spacing:normal;text-align:left;text-transform:none;-webkit-font-smoothing:antialiased}.lssfo-root[data-theme=\"dark\"]{--bg:rgba(28,28,30,.84);--panel:rgba(44,44,46,.76);--sheet:rgba(30,30,32,.92);--th:rgba(40,40,42,.96);--soft:rgba(118,118,128,.12);--strong:rgba(118,118,128,.24);--thumb:rgba(99,99,102,.95);--edge:rgba(255,255,255,.1);--border:rgba(255,255,255,.12);--border-soft:rgba(255,255,255,.07);--text:#f5f5f7;--muted:rgba(235,235,245,.64);--subtle:rgba(235,235,245,.42);--primary:#0a84ff;--primary-soft:rgba(10,132,255,.2);--danger:#ff6961;--danger-soft:rgba(255,69,58,.2);--warning:#ffb340;--warning-soft:rgba(255,159,10,.18);--success:#4cd964;--success-soft:rgba(48,209,88,.18);--green:#30d158;--red:#ff453a;--orange:#ff9f0a;--shadow:0 24px 70px rgba(0,0,0,.55),0 2px 8px rgba(0,0,0,.3);--shadow-small:0 4px 14px rgba(0,0,0,.25);--map-bg:#1c1c1e;color-scheme:dark}.lssfo-root.lssfo-lite{--bg:#f2f2f7;--panel:#fff;--sheet:#f6f6f8;--th:#f8f8fa;--blur:none}.lssfo-root.lssfo-lite[data-theme=\"dark\"]{--bg:#1c1c1e;--panel:#2c2c2e;--sheet:#1e1e20;--th:#28282a}.lssfo-root.lssfo-lite *,.lssfo-root.lssfo-lite *::before,.lssfo-root.lssfo-lite *::after{-webkit-backdrop-filter:none !important;backdrop-filter:none !important;animation-duration:.001ms !important;animation-delay:0s !important;transition-duration:.001ms !important}@media (prefers-reduced-motion:reduce){.lssfo-root *,.lssfo-root *::before,.lssfo-root *::after{scroll-behavior:auto !important;animation-duration:.001ms !important;animation-delay:0s !important;transition-duration:.001ms !important}}.lssfo-root[hidden],.lssfo-root [hidden]{display:none !important}.lssfo-root,.lssfo-root *,.lssfo-root *::before,.lssfo-root *::after{box-sizing:border-box}.lssfo-root :where(h1,h2,h3,h4,p,ul,ol,dl,dd,form,figure){margin:0;padding:0}.lssfo-root :where(h1,h2,h3,h4){color:var(--text);font-family:var(--font)}.lssfo-root label{display:block;max-width:none;margin:0;font-weight:inherit}.lssfo-root :where(button,input,select,textarea){margin:0;color:inherit;font:inherit;letter-spacing:normal;text-transform:none;line-height:normal;box-shadow:none}.lssfo-root a{color:var(--primary);text-decoration:none}.lssfo-root a:hover{text-decoration:underline}.lssfo-root select option,.lssfo-root select optgroup{color:#1d1d1f;background:#fff}.lssfo-root[data-theme=\"dark\"] select option,.lssfo-root[data-theme=\"dark\"] select optgroup{color:#f5f5f7;background:#2c2c2e}.lssfo-root .lssfo-icon{display:block;width:17px;height:17px;flex:0 0 auto;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}.lssfo-root .lssfo-muted{color:var(--subtle)}.lssfo-root .lssfo-center{text-align:center}.lssfo-root .lssfo-btn{display:inline-flex;min-height:34px;align-items:center;justify-content:center;gap:6px;padding:0 14px;border:0;border-radius:10px;color:var(--primary);background:var(--primary-soft);font-size:13px;font-weight:600;line-height:1;text-decoration:none;white-space:nowrap;cursor:pointer;transition:transform .25s var(--spring),background .2s,filter .2s,opacity .2s}.lssfo-root .lssfo-btn:hover,.lssfo-root .lssfo-btn:focus-visible{background:color-mix(in srgb,var(--primary) 20%,transparent);outline:0;text-decoration:none}.lssfo-root .lssfo-btn:active{transform:scale(.96)}.lssfo-root .lssfo-btn:disabled{opacity:.42;cursor:default;transform:none}.lssfo-root .lssfo-btn.is-primary{color:#fff;background:var(--primary);box-shadow:0 4px 12px color-mix(in srgb,var(--primary) 28%,transparent)}.lssfo-root .lssfo-btn.is-primary:hover,.lssfo-root .lssfo-btn.is-primary:focus-visible{background:var(--primary);filter:brightness(1.08)}.lssfo-root .lssfo-btn.is-danger{color:var(--danger);background:var(--danger-soft)}.lssfo-root .lssfo-btn.is-small{min-height:28px;padding:0 11px;border-radius:14px;font-size:12px}.lssfo-root .lssfo-btn.is-wide{width:100%}.lssfo-root .lssfo-btn .lssfo-icon{width:15px;height:15px}.lssfo-root .lssfo-icon-btn{display:inline-grid;width:34px;height:34px;flex:0 0 auto;place-items:center;padding:0;border:0;border-radius:50%;color:var(--muted);background:var(--strong);cursor:pointer;transition:transform .2s var(--spring),background .2s,color .2s}.lssfo-root .lssfo-icon-btn:hover,.lssfo-root .lssfo-icon-btn:focus-visible{color:var(--text);background:color-mix(in srgb,var(--text) 14%,transparent);outline:0}.lssfo-root .lssfo-icon-btn:active{transform:scale(.92)}.lssfo-root .lssfo-icon-btn .lssfo-icon{width:15px;height:15px}.lssfo-root .lssfo-link{padding:0;border:0;color:var(--primary);background:transparent;font-size:13px;font-weight:500;cursor:pointer}.lssfo-root .lssfo-link:hover{opacity:.7}.lssfo-root .lssfo-field{display:grid;gap:5px;min-width:0;color:var(--muted);font-size:12px;font-weight:500}.lssfo-root .lssfo-field small{color:var(--subtle);font-size:11px;font-weight:400}.lssfo-root .lssfo-field :is(input,select),.lssfo-root .lssfo-input{width:100%;min-width:0;height:36px;padding:6px 10px;border:0;border-radius:10px;outline:0;color:var(--text);background:var(--strong);font-size:14px;font-weight:400;transition:box-shadow .2s,background .2s}.lssfo-root .lssfo-field :is(input,select):focus,.lssfo-root .lssfo-input:focus{background:var(--panel);box-shadow:0 0 0 3.5px color-mix(in srgb,var(--primary) 35%,transparent)}.lssfo-root .lssfo-field :is(input,select):disabled,.lssfo-root .lssfo-input:disabled{opacity:.45;cursor:default}.lssfo-root .lssfo-switch{position:relative;display:block;width:42px;height:25px;flex:0 0 auto;margin:0;padding:0;border:0;border-radius:13px;background:var(--strong);-webkit-appearance:none;appearance:none;cursor:pointer;transition:background .3s var(--ease)}.lssfo-root .lssfo-switch::after{content:\"\";position:absolute;top:2px;left:2px;width:21px;height:21px;border-radius:50%;background:#fff;box-shadow:0 2px 5px rgba(0,0,0,.22),0 0 0 .5px rgba(0,0,0,.04);transition:transform .4s var(--spring)}.lssfo-root .lssfo-switch:checked{background:var(--green)}.lssfo-root .lssfo-switch:checked::after{transform:translateX(17px)}.lssfo-root .lssfo-switch:disabled{opacity:.4;cursor:default}.lssfo-root .lssfo-switch:focus-visible{outline:3px solid color-mix(in srgb,var(--primary) 45%,transparent);outline-offset:2px}.lssfo-root .lssfo-toggle{display:inline-flex;min-height:36px;align-items:center;gap:8px;color:var(--muted);font-size:13px;font-weight:500;white-space:nowrap;cursor:pointer}.lssfo-root .lssfo-search{display:flex;min-width:180px;height:36px;align-items:center;gap:8px;padding:0 12px;border-radius:11px;color:var(--subtle);background:var(--strong);transition:box-shadow .25s var(--ease),background .25s}.lssfo-root .lssfo-search:focus-within{background:var(--panel);box-shadow:0 0 0 3.5px color-mix(in srgb,var(--primary) 35%,transparent)}.lssfo-root .lssfo-search input{flex:1;min-width:0;height:100%;padding:0;border:0;outline:0;color:var(--text);background:transparent;font-size:14px}.lssfo-root .lssfo-search input::placeholder{color:var(--subtle)}.lssfo-root .lssfo-badge{display:inline-flex;min-width:24px;align-items:center;justify-content:center;margin:1px 2px;padding:3px 8px;border-radius:10px;color:var(--muted);background:var(--strong);font-size:12px;font-weight:600;line-height:1.25;white-space:nowrap}.lssfo-root .lssfo-badge.is-ok{color:var(--success);background:var(--success-soft)}.lssfo-root .lssfo-badge.is-warn{color:var(--warning);background:var(--warning-soft)}.lssfo-root .lssfo-badge.is-danger{color:var(--danger);background:var(--danger-soft)}.lssfo-root .lssfo-note{display:flex;align-items:center;gap:9px;margin:0 0 12px;padding:10px 14px;border-radius:12px;color:var(--primary);background:var(--primary-soft);font-size:13px;font-weight:500;animation:lssfo-drop .35s var(--spring) both}.lssfo-root .lssfo-note b{font-weight:700}.lssfo-root .lssfo-note.is-error{color:var(--danger);background:var(--danger-soft)}.lssfo-root .lssfo-note.is-warn{color:var(--warning);background:var(--warning-soft)}.lssfo-root .lssfo-note.is-success{color:var(--success);background:var(--success-soft)}.lssfo-root .lssfo-spinner{display:inline-block;width:14px;height:14px;flex:0 0 auto;border:2px solid currentColor;border-right-color:transparent;border-radius:50%;vertical-align:-2px;animation:lssfo-spin .7s linear infinite}.lssfo-root .lssfo-empty{padding:40px 20px;border-radius:16px;color:var(--muted);background:var(--panel);box-shadow:var(--shadow-small);font-size:14px;text-align:center}.lssfo-root .lssfo-empty.is-small{display:flex;align-items:center;justify-content:center;gap:8px;padding:20px 14px;background:transparent;box-shadow:none}.lssfo-root .lssfo-card{border-radius:16px;background:var(--panel);box-shadow:var(--shadow-small)}.lssfo-layer{position:fixed;inset:0;z-index:100020;pointer-events:none}.lssfo-layer > *{pointer-events:auto}.lssfo-root .lssfo-modal{position:fixed;inset:0;animation:lssfo-fade .2s var(--ease) both}.lssfo-root .lssfo-modal.is-closing{animation:lssfo-fade-out .16s var(--ease) forwards;pointer-events:none}.lssfo-root .lssfo-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.32);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px)}.lssfo-root.lssfo-lite .lssfo-backdrop{background:rgba(0,0,0,.5)}.lssfo-root .lssfo-dialog{position:absolute;inset:0;display:flex;width:min(760px,calc(100vw - 32px));height:fit-content;max-height:calc(100vh - 32px);flex-direction:column;margin:auto;overflow:hidden;border:.5px solid var(--edge);border-radius:24px;color:var(--text);background:var(--sheet);box-shadow:var(--shadow);-webkit-backdrop-filter:var(--blur);backdrop-filter:var(--blur);animation:lssfo-rise .45s var(--spring) both}.lssfo-root .lssfo-dialog.is-sm{width:min(560px,calc(100vw - 24px))}.lssfo-root .lssfo-dialog.is-lg{width:min(980px,calc(100vw - 32px))}.lssfo-root .lssfo-dialog.is-full{inset:24px;width:auto;height:auto;max-height:none}.lssfo-root .lssfo-dialog-head{display:flex;flex:0 0 auto;align-items:center;justify-content:space-between;gap:15px;padding:16px 16px 12px 20px;border-bottom:.5px solid var(--border-soft)}.lssfo-root .lssfo-dialog-title{display:flex;min-width:0;align-items:center;gap:13px}.lssfo-root .lssfo-dialog-title > div{min-width:0}.lssfo-root .lssfo-dialog-title span{color:var(--muted);font-size:12px;font-weight:600;letter-spacing:.02em;text-transform:uppercase}.lssfo-root .lssfo-dialog-title h2{margin:2px 0 0;overflow:hidden;font:700 20px/1.2 var(--font);letter-spacing:-.02em;text-overflow:ellipsis;white-space:nowrap}.lssfo-root .lssfo-dialog-tools{display:flex;flex:0 0 auto;align-items:center;gap:6px}.lssfo-root .lssfo-dialog-glyph{display:grid;width:42px;height:42px;flex:0 0 auto;place-items:center;border-radius:12px;color:#fff;background:var(--glyph,var(--primary));box-shadow:0 6px 16px rgba(0,0,0,.18)}.lssfo-root .lssfo-dialog-glyph .lssfo-icon{width:21px;height:21px}.lssfo-root .lssfo-dialog-body{flex:1;min-height:0;padding:16px 20px 20px;overflow-y:auto}.lssfo-root .lssfo-dialog-foot{display:flex;flex:0 0 auto;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:10px;padding:12px 20px;border-top:.5px solid var(--border-soft)}.lssfo-root .lssfo-dialog-text{margin:0 0 14px;color:var(--muted);font-size:14px;line-height:1.5}.lssfo-root .lssfo-dialog-text b{color:var(--text)}.lssfo-root .lssfo-actions{display:flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:8px;margin-top:4px}.lssfo-root .lssfo-actions.is-center{justify-content:center}.lssfo-root .lssfo-dialog .lssfo-actions .lssfo-btn{min-height:38px;padding:0 18px;border-radius:12px;font-size:14px}.lssfo-root .lssfo-success{display:grid;width:64px;height:64px;margin:6px auto 12px;place-items:center;border-radius:50%;color:#fff;background:var(--green);box-shadow:0 10px 28px rgba(52,199,89,.4);animation:lssfo-pop .6s var(--spring) both}.lssfo-root .lssfo-success .lssfo-icon{width:32px;height:32px;stroke-width:3}.lssfo-root .lssfo-build{display:grid;gap:12px}.lssfo-root .lssfo-build-map{height:190px;overflow:hidden;border-radius:16px;background:var(--map-bg);box-shadow:var(--shadow-small)}.lssfo-root .lssfo-build-meta{display:flex;flex-wrap:wrap;gap:6px 14px;color:var(--muted);font-size:12px}.lssfo-root .lssfo-build-meta b{color:var(--text);font-weight:600}.lssfo-root .lssfo-build-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}.lssfo-root .lssfo-build-row:empty{display:none}.lssfo-root .lssfo-more{padding:10px 12px;border-radius:12px;background:var(--soft)}.lssfo-root .lssfo-more summary{color:var(--primary);font-size:13px;font-weight:600;cursor:pointer}.lssfo-root .lssfo-more[open] summary{margin-bottom:10px}.lssfo-root .lssfo-more > div{display:grid;gap:10px}.lssfo-root .lssfo-drag-pin{border:0;background:transparent}.lssfo-root .lssfo-drag-pin div{width:26px;height:26px;border:3px solid #fff;border-radius:50%;background:var(--pin);box-shadow:0 3px 10px rgba(0,0,0,.35)}.lssfo-root .lssfo-toast{position:fixed;left:50%;bottom:22px;max-width:min(480px,calc(100vw - 32px));padding:12px 18px;border:.5px solid var(--edge);border-radius:18px;color:var(--text);background:var(--th);box-shadow:var(--shadow);font-size:14px;font-weight:500;pointer-events:none !important;opacity:0;transform:translate(-50%,20px) scale(.96);transition:opacity .3s var(--ease),transform .5s var(--spring);-webkit-backdrop-filter:var(--blur);backdrop-filter:var(--blur)}.lssfo-root .lssfo-toast.is-visible{opacity:1;transform:translate(-50%,0) scale(1)}.lssfo-root .lssfo-pill{position:fixed;left:16px;bottom:16px;display:flex;align-items:center;gap:8px;padding:9px 15px;border:.5px solid var(--edge);border-radius:20px;color:var(--text);background:var(--th);box-shadow:var(--shadow-small);font-size:13px;font-weight:500}.lssfo-root .lssfo-pill i{width:8px;height:8px;border-radius:50%;background:var(--green);box-shadow:0 0 0 4px rgba(52,199,89,.22)}.lssfo-root .leaflet-container{font:inherit;background:var(--map-bg)}.lssfo-root[data-theme=\"dark\"] .leaflet-tile-pane{filter:brightness(.72) contrast(1.07) saturate(.78)}.lssfo-root .leaflet-popup-content-wrapper{color:var(--text);background:var(--th);border-radius:18px;box-shadow:var(--shadow)}.lssfo-root .leaflet-popup-tip{background:var(--th);box-shadow:none}.lssfo-root .leaflet-control-attribution{border-radius:8px 0 0 0;color:var(--muted);background:var(--th);font-size:10px}.lssfo-root .leaflet-control-attribution a{color:var(--primary)}.lssfo-root .leaflet-control-zoom{overflow:hidden;border:0 !important;border-radius:12px !important;box-shadow:var(--shadow-small) !important}.lssfo-root .leaflet-control-zoom a{color:var(--text) !important;background:var(--th) !important;border-color:var(--border-soft) !important}@keyframes lssfo-fade{from{opacity:0}}@keyframes lssfo-fade-out{to{opacity:0}}@keyframes lssfo-rise{from{opacity:0;transform:translateY(26px) scale(.97)}}@keyframes lssfo-drop{from{opacity:0;transform:translateY(-6px)}}@keyframes lssfo-pop{from{opacity:0;transform:scale(.4)}}@keyframes lssfo-spin{to{transform:rotate(360deg)}}@media (max-width:680px){.lssfo-root .lssfo-dialog,.lssfo-root .lssfo-dialog.is-sm,.lssfo-root .lssfo-dialog.is-lg{width:calc(100vw - 16px);max-height:calc(100vh - 16px)}.lssfo-root .lssfo-dialog.is-full{inset:8px}.lssfo-root .lssfo-build-row{grid-template-columns:1fr}.lssfo-root .lssfo-dialog-head{padding:14px}.lssfo-root .lssfo-dialog-title h2{font-size:18px}}:root.lssfo-open{overflow:hidden !important}html.lssfo-lightbox-front #lightbox_background{z-index:100049 !important}html.lssfo-lightbox-front #lightbox_box{z-index:100050 !important}.lssfo-shell{position:fixed;inset:0;z-index:99990}.lssfo-root .lssfo-shell-backdrop{position:absolute;inset:0;background:rgba(0,0,0,.3);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);animation:lssfo-fade .3s var(--ease) both}.lssfo-root.lssfo-lite .lssfo-shell-backdrop{background:rgba(0,0,0,.5)}.lssfo-root .lssfo-window{position:absolute;inset:16px;display:flex;min-width:0;flex-direction:column;overflow:hidden;border:.5px solid var(--edge);border-radius:26px;background:var(--bg);box-shadow:var(--shadow);-webkit-backdrop-filter:var(--blur);backdrop-filter:var(--blur);animation:lssfo-rise .5s var(--spring) both}.lssfo-shell.is-closing{pointer-events:none}.lssfo-shell.is-closing .lssfo-window,.lssfo-shell.is-closing .lssfo-shell-backdrop{animation:lssfo-fade-out .2s var(--ease) forwards}:root.lssfo-standalone .lssfo-root .lssfo-window{inset:0;border-radius:0}.lssfo-root .lssfo-header{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 20px 10px 22px}.lssfo-root .lssfo-brand{display:flex;min-width:0;align-items:center;gap:13px}.lssfo-root .lssfo-brand-mark{display:grid;width:42px;height:42px;flex:0 0 auto;place-items:center;border-radius:12px;color:#fff;background:linear-gradient(160deg,#ff6259,#e0241a);box-shadow:0 6px 16px rgba(229,37,27,.32)}.lssfo-root .lssfo-brand-glyph{width:20px;height:20px;filter:drop-shadow(0 1px 1px rgba(0,0,0,.2))}.lssfo-root .lssfo-header h1{font-size:24px;font-weight:700;letter-spacing:-.022em;line-height:1.15}.lssfo-root .lssfo-header p{margin-top:2px;color:var(--muted);font-size:13px}.lssfo-root .lssfo-header-actions{display:flex;flex:0 0 auto;align-items:center;gap:8px}.lssfo-root .lssfo-pick{display:flex;min-height:34px;align-items:center;gap:4px;padding:0 4px 0 11px;border-radius:10px;color:var(--muted);background:var(--strong)}.lssfo-root .lssfo-pick .lssfo-icon{width:15px;height:15px}.lssfo-root .lssfo-pick select{padding:6px 4px;border:0;outline:0;color:var(--text);background:transparent;font-size:13px;font-weight:500;cursor:pointer}.lssfo-root .lssfo-status{padding:0 20px}.lssfo-root .lssfo-status .lssfo-note{margin:4px 0 6px}.lssfo-root .lssfo-kpis{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;padding:8px 20px 12px}.lssfo-root .lssfo-kpi{display:grid;min-width:0;gap:2px;padding:13px 15px;border-radius:16px;background:var(--panel);box-shadow:var(--shadow-small)}.lssfo-root .lssfo-kpi > div{display:flex;align-items:center;gap:8px}.lssfo-root .lssfo-kpi i{display:grid;width:26px;height:26px;place-items:center;border-radius:8px;color:#fff;background:var(--primary)}.lssfo-root .lssfo-kpi i .lssfo-icon{width:15px;height:15px}.lssfo-root .lssfo-kpi span{overflow:hidden;color:var(--muted);font-size:13px;font-weight:500;text-overflow:ellipsis;white-space:nowrap}.lssfo-root .lssfo-kpi strong{overflow:hidden;margin-top:4px;font-size:28px;font-weight:700;letter-spacing:-.025em;line-height:1.05;text-overflow:ellipsis;font-variant-numeric:tabular-nums}.lssfo-root .lssfo-kpi small{overflow:hidden;color:var(--subtle);font-size:12px;text-overflow:ellipsis;white-space:nowrap}.lssfo-root .lssfo-kpi.is-danger i{background:var(--red)}.lssfo-root .lssfo-kpi.is-danger strong{color:var(--danger)}.lssfo-root .lssfo-tabs{position:relative;display:flex;flex:0 0 auto;gap:2px;margin:0 20px;padding:3px;overflow-x:auto;overflow-y:hidden;border-radius:12px;background:var(--strong);scrollbar-width:none}.lssfo-root .lssfo-tabs::-webkit-scrollbar{display:none}.lssfo-root .lssfo-tab-indicator{position:absolute;top:3px;bottom:3px;left:0;width:0;border-radius:9px;background:var(--thumb);box-shadow:0 3px 8px rgba(0,0,0,.12),0 0 0 .5px rgba(0,0,0,.04);transition:transform .45s var(--spring),width .45s var(--spring);pointer-events:none}.lssfo-root .lssfo-tabs button{position:relative;display:flex;min-height:32px;flex:0 0 auto;align-items:center;gap:6px;padding:0 12px;border:0;border-radius:9px;color:var(--muted);background:transparent;font-size:13px;font-weight:500;cursor:pointer;transition:color .2s}.lssfo-root .lssfo-tabs button:hover,.lssfo-root .lssfo-tabs button.is-active{color:var(--text)}.lssfo-root .lssfo-tabs button.is-active{font-weight:600}.lssfo-root .lssfo-tabs button .lssfo-icon{width:15px;height:15px}.lssfo-root .lssfo-tabs button.is-active .lssfo-icon{color:var(--primary)}.lssfo-root .lssfo-tabs b{min-width:20px;padding:1px 6px;border-radius:9px;color:var(--muted);background:var(--strong);font-size:11px;font-weight:600;text-align:center;font-variant-numeric:tabular-nums}.lssfo-root .lssfo-tabs button.is-active b{color:#fff;background:var(--primary)}.lssfo-root .lssfo-toolbar{display:flex;flex:0 0 auto;flex-wrap:wrap;align-items:center;gap:10px;margin:12px 20px 10px}.lssfo-root .lssfo-toolbar .lssfo-search{flex:1 1 320px}.lssfo-root .lssfo-input.lssfo-compact{width:auto;height:32px;padding:4px 8px;font-size:13px}.lssfo-root .lssfo-content{flex:1;min-width:0;min-height:0;padding:0 20px 16px;overflow:auto;scrollbar-width:thin;scrollbar-color:var(--strong) transparent}.lssfo-root .lssfo-content.is-entering > *{animation:lssfo-content .4s var(--spring) both}.lssfo-root .lssfo-content.is-entering > :nth-child(2){animation-delay:.03s}.lssfo-root .lssfo-content.is-entering > :nth-child(3){animation-delay:.06s}.lssfo-root .lssfo-footer{display:flex;flex:0 0 auto;align-items:center;justify-content:space-between;gap:15px;padding:10px 22px 14px;border-top:.5px solid var(--border-soft);color:var(--subtle);font-size:12px}@keyframes lssfo-content{from{opacity:0;transform:translateY(8px)}}.lssfo-root .lssfo-table-meta{margin:4px 4px 8px;color:var(--muted);font-size:12px}.lssfo-root .lssfo-table-wrap{width:max-content;min-width:100%;border-radius:16px;background:var(--panel);box-shadow:var(--shadow-small)}.lssfo-root .lssfo-table{width:100%;margin:0;border-collapse:separate;border-spacing:0;color:var(--text);background:transparent;font-size:13px}.lssfo-root .lssfo-table th{position:sticky;top:0;z-index:6;padding:11px 14px;border:0;border-bottom:.5px solid var(--border);color:var(--muted);background:var(--th);font-size:12px;font-weight:600;text-align:left;white-space:nowrap}.lssfo-root .lssfo-table th:first-child{border-top-left-radius:16px}.lssfo-root .lssfo-table th:last-child{border-top-right-radius:16px}.lssfo-root .lssfo-table td{height:46px;padding:9px 14px;border:0;border-top:.5px solid var(--border-soft);color:var(--text);background:transparent;vertical-align:middle}.lssfo-root .lssfo-table tbody tr:first-child td{border-top:0}.lssfo-root .lssfo-table tbody tr:hover td{background:var(--soft)}.lssfo-root .lssfo-table a{font-weight:500}.lssfo-root .lssfo-sort{display:inline-flex;width:100%;align-items:center;justify-content:space-between;gap:7px;padding:0;border:0;color:inherit;background:transparent;font:inherit;text-align:left;cursor:pointer}.lssfo-root .lssfo-sort:hover,.lssfo-root .lssfo-sort.is-active{color:var(--primary)}.lssfo-root .lssfo-sort .lssfo-icon{width:13px;height:13px;color:var(--subtle)}.lssfo-root .lssfo-sort.is-active .lssfo-icon{color:var(--primary)}.lssfo-root .lssfo-table-more{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:8px;margin:12px 0 4px;color:var(--muted);font-size:13px}.lssfo-root .lssfo-training-cell{display:inline-block;min-width:150px}.lssfo-root .lssfo-inline{display:inline-flex;align-items:center;gap:6px}.lssfo-root .lssfo-gaps span{display:block}.lssfo-root .lssfo-complete{color:var(--success)}.lssfo-root .lssfo-score{display:inline-block;min-width:52px;padding:4px 9px;border-radius:10px;color:var(--muted);background:var(--strong);font-size:12px;font-weight:700;text-align:center;font-variant-numeric:tabular-nums}.lssfo-root .lssfo-score.is-ok{color:var(--success);background:var(--success-soft)}.lssfo-root .lssfo-score.is-warn{color:var(--warning);background:var(--warning-soft)}.lssfo-root .lssfo-score.is-danger{color:var(--danger);background:var(--danger-soft)}.lssfo-root .lssfo-callout{display:flex;align-items:center;gap:10px;margin-bottom:12px;padding:12px 15px;border-radius:14px;color:var(--muted);background:var(--primary-soft);font-size:13px}.lssfo-root .lssfo-callout strong{color:var(--text);white-space:nowrap}.lssfo-root .lssfo-panel-card{min-width:0;margin-bottom:12px;padding:16px;border-radius:18px;background:var(--panel);box-shadow:var(--shadow-small)}.lssfo-root .lssfo-intro{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:15px;margin-bottom:12px;padding:14px 16px;border-radius:16px;background:var(--panel);box-shadow:var(--shadow-small)}.lssfo-root .lssfo-intro > div:first-child{display:grid;flex:1 1 280px;gap:2px}.lssfo-root .lssfo-intro strong{font-size:15px;font-weight:600}.lssfo-root .lssfo-intro span{color:var(--muted);font-size:13px}.lssfo-root .lssfo-intro-actions{display:flex;flex-wrap:wrap;align-items:flex-end;gap:10px}.lssfo-root .lssfo-intro-actions .lssfo-field{min-width:160px}.lssfo-root .lssfo-heading{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.lssfo-root .lssfo-heading h3{font-size:17px;font-weight:700;letter-spacing:-.01em}.lssfo-root .lssfo-heading p{margin-top:2px;color:var(--muted);font-size:13px}.lssfo-root .lssfo-actions.is-start{justify-content:flex-start;margin-top:12px}.lssfo-root .lssfo-chips{display:flex;flex-wrap:wrap;gap:6px}.lssfo-root .lssfo-chip{padding:4px 10px;border-radius:12px;color:var(--muted);background:var(--strong);font-size:12px;font-weight:500}.lssfo-root .lssfo-chip.is-active{color:var(--success);background:var(--success-soft)}.lssfo-root .lssfo-chip.is-inactive{color:var(--danger);background:var(--danger-soft)}.lssfo-root .lssfo-chip.is-building,.lssfo-root .lssfo-popup .lssfo-chip{color:var(--warning);background:var(--warning-soft)}.lssfo-root .lssfo-dash-grid{display:grid;grid-template-columns:repeat(6,minmax(130px,1fr));gap:10px;margin-bottom:12px}.lssfo-root .lssfo-dash-card{display:grid;min-width:0;grid-template:auto 1fr/32px minmax(0,1fr);gap:3px 10px;padding:14px;border:0;border-radius:16px;color:var(--text);background:var(--panel);box-shadow:var(--shadow-small);text-align:left;cursor:pointer;transition:transform .35s var(--spring),box-shadow .3s}.lssfo-root .lssfo-dash-card:hover,.lssfo-root .lssfo-dash-card:focus-visible{transform:translateY(-3px);box-shadow:0 12px 28px rgba(0,0,0,.12);outline:0}.lssfo-root .lssfo-dash-card:active{transform:scale(.97)}.lssfo-root .lssfo-dash-card i{display:grid;width:30px;height:30px;grid-row:1/3;place-items:center;border-radius:9px;color:#fff;background:var(--tone)}.lssfo-root .lssfo-dash-card i .lssfo-icon{width:16px;height:16px}.lssfo-root .lssfo-dash-card span{overflow:hidden;color:var(--muted);font-size:12px;font-weight:500;text-overflow:ellipsis;white-space:nowrap}.lssfo-root .lssfo-dash-card strong{font-size:24px;font-weight:700;letter-spacing:-.02em;line-height:1}.lssfo-root .lssfo-dash-card small{grid-column:2;color:var(--subtle);font-size:12px}.lssfo-root .lssfo-dash-columns{display:grid;grid-template-columns:1.15fr .85fr;gap:12px}.lssfo-root .lssfo-dash-columns .lssfo-panel-card{padding:16px 10px 8px}.lssfo-root .lssfo-dash-columns .lssfo-heading{padding:0 8px}.lssfo-root .lssfo-row-button{display:flex;width:100%;align-items:center;justify-content:space-between;gap:10px;padding:10px;border:0;border-radius:12px;color:var(--text);background:transparent;text-align:left;cursor:pointer;transition:background .2s}.lssfo-root .lssfo-row-button + .lssfo-row-button{box-shadow:0 -.5px 0 var(--border-soft)}.lssfo-root .lssfo-row-button:hover{background:var(--soft)}.lssfo-root .lssfo-row-button > span{display:grid;min-width:0;gap:1px}.lssfo-root .lssfo-row-button strong{overflow:hidden;font-size:14px;font-weight:500;text-overflow:ellipsis;white-space:nowrap}.lssfo-root .lssfo-row-button small{color:var(--muted);font-size:12px}.lssfo-root .lssfo-row-button > .lssfo-icon{width:15px;height:15px;color:var(--subtle)}.lssfo-root .lssfo-row-button.priority-4 strong::before,.lssfo-root .lssfo-row-button.priority-3 strong::before{content:\"\";display:inline-block;width:7px;height:7px;margin-right:7px;border-radius:50%;background:var(--red);vertical-align:1px}.lssfo-root .lssfo-row-button.priority-3 strong::before{background:var(--orange)}.lssfo-root .lssfo-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-bottom:12px}.lssfo-root .lssfo-stat{display:grid;gap:3px;padding:14px 16px;border-radius:16px;background:var(--panel);box-shadow:var(--shadow-small)}.lssfo-root .lssfo-stat span{color:var(--muted);font-size:12px;font-weight:500}.lssfo-root .lssfo-stat strong{overflow:hidden;font-size:17px;font-weight:700;text-overflow:ellipsis;white-space:nowrap}.lssfo-root .lssfo-stat small{color:var(--subtle);font-size:12px}.lssfo-root .lssfo-transfer{display:grid;grid-template-columns:30px minmax(0,1fr) auto;align-items:center;gap:11px;padding:10px 4px;border-top:.5px solid var(--border-soft)}.lssfo-root .lssfo-transfer i{display:grid;width:30px;height:30px;place-items:center;border-radius:9px;color:#fff;background:#5856d6}.lssfo-root .lssfo-transfer i .lssfo-icon{width:15px;height:15px}.lssfo-root .lssfo-transfer div{display:grid;min-width:0;gap:1px}.lssfo-root .lssfo-transfer strong{overflow:hidden;font-size:14px;font-weight:500;text-overflow:ellipsis;white-space:nowrap}.lssfo-root .lssfo-transfer small{color:var(--muted);font-size:12px}.lssfo-root .lssfo-window.is-map .lssfo-content{display:flex;flex-direction:column}.lssfo-root .lssfo-map-filters{display:flex;flex-wrap:wrap;align-items:flex-end;gap:10px 12px;padding:14px}.lssfo-root .lssfo-map-filters > .lssfo-field{min-width:150px;flex:1 1 150px}.lssfo-root .lssfo-map-source{flex:1 0 100%;color:var(--subtle);font-size:11px;text-align:right}.lssfo-root .lssfo-map-layout{display:grid;flex:1;min-height:380px;grid-template-columns:minmax(230px,300px) minmax(0,1fr);overflow:hidden;border-radius:18px;background:var(--panel);box-shadow:var(--shadow-small)}.lssfo-root .lssfo-map-list{min-height:0;overflow-y:auto;border-right:.5px solid var(--border)}.lssfo-root .lssfo-map-list-head{position:sticky;top:0;z-index:2;display:grid;gap:2px;padding:14px;border-bottom:.5px solid var(--border);background:var(--th)}.lssfo-root .lssfo-map-list-head strong{font-size:15px;font-weight:700}.lssfo-root .lssfo-map-list-head span{color:var(--muted);font-size:12px}.lssfo-root .lssfo-map-item{display:flex;width:100%;align-items:center;justify-content:space-between;gap:8px;padding:10px 14px;border:0;border-bottom:.5px solid var(--border-soft);color:var(--text);background:transparent;text-align:left;cursor:pointer;transition:background .15s}.lssfo-root .lssfo-map-item:hover{background:var(--soft)}.lssfo-root .lssfo-map-item.is-inactive{opacity:.55}.lssfo-root .lssfo-map-item > span{display:grid;min-width:0;gap:1px}.lssfo-root .lssfo-map-item strong,.lssfo-root .lssfo-map-item small{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.lssfo-root .lssfo-map-item strong{font-size:14px;font-weight:500}.lssfo-root .lssfo-map-item small{color:var(--muted);font-size:12px}.lssfo-root .lssfo-map-item b{flex:0 0 auto;padding:2px 8px;border-radius:10px;color:var(--primary);background:var(--primary-soft);font-size:12px;font-weight:600}.lssfo-root .lssfo-map-stage{position:relative;min-width:0;min-height:0;background:var(--map-bg)}.lssfo-root .lssfo-map-canvas{width:100%;height:100%;min-height:380px}.lssfo-root .lssfo-map-legend{position:absolute;top:12px;right:12px;z-index:500;display:flex;gap:10px;padding:7px 12px;border:.5px solid var(--edge);border-radius:14px;background:var(--th);box-shadow:var(--shadow-small);font-size:12px}.lssfo-root .lssfo-map-legend span{display:flex;align-items:center;gap:5px}.lssfo-root .lssfo-map-legend i{width:8px;height:8px;border-radius:50%;background:#8e8e93}.lssfo-root .lssfo-map-legend i.is-ok{background:#34c759}.lssfo-root .lssfo-map-legend i.is-danger{background:#ff3b30}.lssfo-root .leaflet-tooltip.lssfo-district-label{padding:3px 7px;border:0;border-radius:8px;color:#7a4a00;background:rgba(255,244,222,.9);box-shadow:0 2px 6px rgba(0,0,0,.12);font:600 11px/1.2 var(--font)}.lssfo-root[data-theme=\"dark\"] .leaflet-tooltip.lssfo-district-label{color:#ffd27a;background:rgba(58,46,26,.9)}.lssfo-root .lssfo-popup{min-width:280px;color:var(--text);font-family:var(--font)}.lssfo-root .lssfo-popup h3{margin:0 0 8px;font-size:16px;font-weight:700}.lssfo-root .lssfo-popup-meta{display:flex;flex-wrap:wrap;align-items:center;gap:6px}.lssfo-root .lssfo-popup p{margin:8px 0;color:var(--muted);font-size:12px}.lssfo-root .lssfo-popup p .is-danger{color:var(--danger)}.lssfo-root .lssfo-popup p .is-ok{color:var(--success)}.lssfo-root .lssfo-popup ul{max-height:220px;margin:0;padding:0;overflow-y:auto;list-style:none}.lssfo-root .lssfo-popup li{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:5px;padding:8px 10px;border-radius:10px;background:var(--soft)}.lssfo-root .lssfo-popup li > span{display:grid;gap:1px}.lssfo-root .lssfo-popup li small{color:var(--muted);font-size:11px}.lssfo-root .lssfo-popup li.has-missing{background:var(--danger-soft)}.lssfo-root .lssfo-popup li.has-missing b{color:var(--danger)}.lssfo-root .lssfo-popup li.is-complete{background:var(--success-soft)}.lssfo-root .lssfo-popup li.is-complete b{color:var(--success)}.lssfo-root .lssfo-editor{display:flex;flex-wrap:wrap;align-items:flex-end;gap:14px}.lssfo-root .lssfo-editor > .lssfo-field{min-width:200px}.lssfo-root .lssfo-editor-group{display:flex;flex-wrap:wrap;align-items:flex-end;gap:10px}.lssfo-root .lssfo-editor-group .lssfo-field{min-width:170px}.lssfo-root .lssfo-editor-save{display:flex;align-items:center;gap:10px;margin-left:auto;color:var(--muted);font-size:13px}.lssfo-root .lssfo-inline-input{width:100%;min-width:120px;min-height:30px;padding:0 8px;border:.5px solid transparent;border-radius:8px;outline:0;color:var(--text);background:transparent;font-size:13px}.lssfo-root .lssfo-inline-input:hover{border-color:var(--border)}.lssfo-root .lssfo-inline-input:focus{border-color:var(--primary);background:var(--th)}.lssfo-root .lssfo-inline-input.is-changed{border-color:var(--warning);background:var(--warning-soft)}.lssfo-root .lssfo-refit-preset{margin-bottom:14px}.lssfo-root .lssfo-refit-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px}.lssfo-root .lssfo-refit-field{display:grid;gap:4px;padding:12px 14px;border-radius:14px;background:var(--panel);box-shadow:var(--shadow-small)}.lssfo-root .lssfo-refit-field strong{font-size:14px}.lssfo-root .lssfo-refit-field small{color:var(--muted);font-size:12px}.lssfo-root .lssfo-refit-field span{display:flex;align-items:center;gap:10px;margin-top:4px}.lssfo-root .lssfo-refit-field .lssfo-input{width:140px}.lssfo-root .lssfo-refit-field em{color:var(--muted);font-size:12px;font-style:normal}.lssfo-root .lssfo-refit-note{flex:1 1 280px;color:var(--muted);font-size:13px}.lssfo-root .lssfo-section{margin-bottom:12px;padding:16px;border-radius:18px;background:var(--panel);box-shadow:var(--shadow-small)}.lssfo-root .lssfo-form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.lssfo-root .lssfo-status-card{display:grid;grid-template-columns:auto auto 1fr;align-items:center;gap:6px 10px;padding:12px;border-radius:14px;background:var(--soft)}.lssfo-root .lssfo-status-card > span{color:var(--muted);font-size:12px;font-weight:500}.lssfo-root .lssfo-status-card > .lssfo-btn{justify-self:end}.lssfo-root .lssfo-status-card > small{grid-column:1/-1;color:var(--subtle);font-size:11px}.lssfo-root .lssfo-person-search{min-width:240px}.lssfo-root .lssfo-personnel{width:100%;max-height:380px;overflow:auto;background:var(--soft);box-shadow:none}.lssfo-root .lssfo-station-vehicles{display:grid;gap:6px}.lssfo-root .lssfo-station-vehicles article{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:10px;padding:10px 12px;border-radius:12px;background:var(--soft)}.lssfo-root .lssfo-station-vehicles article.has-missing{box-shadow:inset 3px 0 0 var(--red)}.lssfo-root .lssfo-station-vehicles article.is-complete{box-shadow:inset 3px 0 0 var(--green)}.lssfo-root .lssfo-station-vehicles article > div{display:flex;align-items:center;gap:8px}.lssfo-root .lssfo-station-vehicles article > div:first-child{display:grid;gap:1px}.lssfo-root .lssfo-station-vehicles a{font-weight:600}.lssfo-root .lssfo-station-vehicles span{color:var(--muted);font-size:12px}.lssfo-root .lssfo-dialog.is-full{display:flex}.lssfo-root .lssfo-frame-wrap{position:relative;flex:1;min-height:0;padding:12px}.lssfo-root .lssfo-frame-wrap iframe{display:block;width:100%;height:100%;min-height:420px;border:0;border-radius:16px;background:#fff;box-shadow:var(--shadow-small)}.lssfo-root .lssfo-frame-warning{position:absolute;top:24px;left:50%;z-index:3;width:min(680px,calc(100% - 48px));transform:translateX(-50%)}.lssfo-root .lssfo-course-controls{display:flex;flex:0 0 auto;flex-wrap:wrap;align-items:flex-end;gap:12px;padding:12px 20px;border-bottom:.5px solid var(--border-soft)}.lssfo-root .lssfo-course-controls .lssfo-field{min-width:260px;flex:1}.lssfo-root .lssfo-course-controls p{flex:1 1 380px;color:var(--muted);font-size:13px}@media (max-width:1180px){.lssfo-root .lssfo-dash-grid{grid-template-columns:repeat(3,minmax(130px,1fr))}}@media (max-width:900px){.lssfo-root .lssfo-header{align-items:flex-start;flex-direction:column;gap:12px}.lssfo-root .lssfo-header-actions{width:100%;flex-wrap:wrap;justify-content:flex-end}.lssfo-root .lssfo-kpis{grid-template-columns:repeat(2,minmax(0,1fr))}.lssfo-root .lssfo-dash-columns{grid-template-columns:1fr}.lssfo-root .lssfo-map-layout{grid-template-columns:220px minmax(0,1fr)}.lssfo-root .lssfo-editor-save{margin-left:0}}@media (max-width:680px){.lssfo-root .lssfo-window{inset:0;border-radius:0}.lssfo-root .lssfo-header{padding:14px 14px 8px}.lssfo-root .lssfo-header h1{font-size:21px}.lssfo-root .lssfo-brand-mark{width:36px;height:36px}.lssfo-root .lssfo-header-actions{justify-content:flex-start}.lssfo-root .lssfo-collapse span{display:none}.lssfo-root .lssfo-kpis{gap:8px;padding:6px 12px 10px}.lssfo-root .lssfo-kpi{padding:10px 12px}.lssfo-root .lssfo-kpi strong{font-size:22px}.lssfo-root .lssfo-tabs{margin:0 12px}.lssfo-root .lssfo-toolbar{margin:10px 12px}.lssfo-root .lssfo-content{padding:0 12px 12px}.lssfo-root .lssfo-status{padding:0 12px}.lssfo-root .lssfo-dash-grid{grid-template-columns:repeat(2,minmax(120px,1fr))}.lssfo-root .lssfo-stats,.lssfo-root .lssfo-form-grid{grid-template-columns:1fr}.lssfo-root .lssfo-map-layout{grid-template-columns:1fr}.lssfo-root .lssfo-map-list{display:none}.lssfo-root .lssfo-transfer{grid-template-columns:30px minmax(0,1fr)}.lssfo-root .lssfo-transfer .lssfo-btn{grid-column:1/-1}.lssfo-root .lssfo-footer{display:none}.lssfo-root .lssfo-person-search{min-width:0;width:100%}}"};

// ---- shared/kit.js ----
/*
 * LSS-Kit – gemeinsamer Unterbau von „LSS Verwaltung“ und „LSS Wachenplaner Österreich“.
 *
 * Wird beim Bauen in beide Scripts eingebettet (jedes mit eigenem Präfix), damit beide
 * gleich aussehen, sich gleich bedienen lassen und das Spiel gleich schonend behandeln:
 *
 *  - Eine Warteschlange für alle Anfragen an das Spiel: höchstens zwei gleichzeitig,
 *    Mindestabstand zwischen zwei Anfragen, automatische Pause bei Überlastung (429/5xx).
 *    Bedienaktionen (Speichern, Zuweisen, Bauen) überholen laufende Hintergrundprüfungen.
 *  - Oberfläche, Stylesheets und Theme-Beobachtung entstehen erst beim ersten Öffnen –
 *    auf normalen Spielseiten kostet ein Script nur den Eintrag in der Navigationsleiste.
 *  - Einheitliche Aktionen (data-action / data-change / data-input), Dialoge, Hinweise.
 *  - Design (LSS-Design, Hell, Dunkel) und Effektstufe (Auto, Voll, Sparsam).
 *  - Bau-Dialog für echte Standorte und die Verbindung zur Wachenplaner-Webseite.
 */
function createKit(config) {
  const P = config.prefix;
  const pageWindow = typeof unsafeWindow !== "undefined" ? unsafeWindow : window;

  /* ---------- Formatierung ---------- */

  const numberFormat = new Intl.NumberFormat("de-DE");
  const decimalFormat = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 1 });
  const collator = new Intl.Collator("de", { numeric: true, sensitivity: "base" });
  const ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };

  const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ESCAPES[char]);
  const formatNumber = (value) => numberFormat.format(Number(value) || 0);
  const formatDecimal = (value) => decimalFormat.format(Number(value) || 0);
  const formatDistance = (meters) => (meters < 1000 ? `${formatNumber(Math.round(meters))} m` : `${decimalFormat.format(meters / 1000)} km`);
  const plural = (count, one, many) => `${formatNumber(count)} ${count === 1 ? one : many}`;
  const textOf = (element) => (element?.textContent || "").replace(/\s+/g, " ").trim();

  function formatDateTime(value) {
    const date = value instanceof Date ? value : value ? new Date(value) : null;
    return date && !Number.isNaN(date.valueOf()) ? date.toLocaleString("de-DE", { dateStyle: "short", timeStyle: "short" }) : "–";
  }

  function haversine(lat1, lon1, lat2, lon2) {
    if (![lat1, lon1, lat2, lon2].every(Number.isFinite)) return NaN;
    const rad = Math.PI / 180;
    const a = Math.sin(((lat2 - lat1) * rad) / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(((lon2 - lon1) * rad) / 2) ** 2;
    return 12742000 * Math.asin(Math.sqrt(a));
  }

  const abortError = () => new DOMException("Abgebrochen", "AbortError");
  const isAbort = (error) => error?.name === "AbortError";

  function sleep(ms, signal) {
    return new Promise((resolve, reject) => {
      if (signal?.aborted) return reject(abortError());
      const timer = setTimeout(resolve, ms);
      signal?.addEventListener("abort", () => {
        clearTimeout(timer);
        reject(abortError());
      }, { once: true });
    });
  }

  /* ---------- Speicher ---------- */

  function readStored(key) {
    try {
      const raw = typeof GM_getValue === "function" ? GM_getValue(key, null) : localStorage.getItem(key);
      if (!raw) return {};
      return (typeof raw === "string" ? JSON.parse(raw) : raw) || {};
    } catch {
      return {};
    }
  }

  // Einstellungen: Werte mit Vorgaben, Speichern im Tampermonkey-Speicher (sonst localStorage).
  function store(key, defaults) {
    const values = { ...defaults, ...readStored(key) };
    return {
      values,
      set(patch) {
        Object.assign(values, patch);
        const text = JSON.stringify(values);
        try {
          if (typeof GM_setValue === "function") GM_setValue(key, text);
          else localStorage.setItem(key, text);
        } catch { /* Die Einstellung gilt dann nur für diese Sitzung. */ }
      },
    };
  }

  const session = {
    get(key) {
      try { return sessionStorage.getItem(key); } catch { return null; }
    },
    set(key, value) {
      try { sessionStorage.setItem(key, value); } catch { /* Gilt nur für diese Anfrage. */ }
    },
  };

  /* ---------- Anfragen an das Spiel ---------- */

  // Alle Spielanfragen laufen durch diese Warteschlange. Mehr als zwei gleichzeitige
  // Anfragen oder dichte Folgen belasten die Server und fallen auf – genau das soll
  // ein Script nie tun.
  const queue = (() => {
    const waiting = [];
    const { concurrency = 2, gap = 250 } = config.requests || {};
    let active = 0;
    let nextStart = 0;
    let timer = 0;

    function pump() {
      if (timer) return;
      while (active < concurrency && waiting.length) {
        const now = Date.now();
        if (now < nextStart) {
          timer = setTimeout(() => {
            timer = 0;
            pump();
          }, nextStart - now);
          return;
        }
        const job = waiting.shift();
        if (job.signal?.aborted) {
          job.reject(abortError());
          continue;
        }
        active += 1;
        nextStart = now + gap;
        Promise.resolve().then(job.run).then(job.resolve, job.reject).finally(() => {
          active -= 1;
          pump();
        });
      }
    }

    function add(run, { signal, priority = false } = {}) {
      return new Promise((resolve, reject) => {
        const job = { run, resolve, reject, signal };
        if (priority) waiting.unshift(job);
        else waiting.push(job);
        signal?.addEventListener("abort", () => {
          const index = waiting.indexOf(job);
          if (index < 0) return;
          waiting.splice(index, 1);
          reject(abortError());
        }, { once: true });
        pump();
      });
    }

    // Überlastung: die ganze Warteschlange pausiert, nicht nur die betroffene Anfrage.
    function pause(ms) {
      nextStart = Math.max(nextStart, Date.now() + ms);
    }

    return { add, pause };
  })();

  function httpError(response, url) {
    const path = String(url).replace(/^https?:\/\/[^/]+/, "");
    const error = new Error(`${response.status} ${response.statusText || "Fehler"} (${path})`);
    error.status = response.status;
    return error;
  }

  async function backoff(attempt, response, signal) {
    const retryAfter = Number(response?.headers?.get?.("Retry-After"));
    const wait = Math.min(30000, retryAfter > 0 ? retryAfter * 1000 : 1000 * 2 ** attempt);
    queue.pause(wait);
    await sleep(wait, signal);
  }

  // GET-Anfragen werden bei Überlastung bis zu dreimal wiederholt, Änderungen
  // (POST oder Schalter-Links) nie – sonst würde etwas doppelt ausgeführt.
  async function request(url, { method = "GET", body, headers = {}, signal, priority = false, retries } = {}) {
    const maxRetries = retries ?? (method === "GET" ? 3 : 0);
    for (let attempt = 0; ; attempt += 1) {
      let response;
      try {
        response = await queue.add(() => fetch(url, { method, body, headers, signal, credentials: "include", redirect: "follow" }), { signal, priority });
      } catch (error) {
        if (isAbort(error)) throw error;
        if (attempt >= maxRetries) throw new Error(`Netzwerkfehler (${String(url).replace(/^https?:\/\/[^/]+/, "")})`);
        await backoff(attempt, null, signal);
        continue;
      }
      if (response.ok) return response;
      if (!(response.status === 429 || response.status >= 500) || attempt >= maxRetries) throw httpError(response, url);
      await backoff(attempt, response, signal);
    }
  }

  const getHtml = (url, options = {}) => request(url, { ...options, headers: { Accept: "text/html" } }).then((response) => response.text());
  const getJson = (url, options = {}) => request(url, { ...options, headers: { Accept: "application/json" } }).then((response) => response.json());
  const csrfToken = () => document.querySelector('meta[name="csrf-token"]')?.content || "";
  const formHeaders = (csrf) => ({
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "X-CSRF-Token": csrf || csrfToken(),
    "X-Requested-With": "XMLHttpRequest",
  });

  // Sendet ein aus einer Spielseite gelesenes Formular so ab, wie es der Knopf des Spiels täte.
  function submitForm(form, extraEntries = [], options = {}) {
    const body = new URLSearchParams();
    for (const [key, value] of new FormData(form)) if (typeof value === "string") body.append(key, value);
    for (const [key, value] of extraEntries) body.append(key, value);
    const csrf = form.querySelector('input[name="authenticity_token"]')?.value;
    const action = new URL(form.getAttribute("action") || location.pathname, location.origin).href;
    return request(action, { method: (form.getAttribute("method") || "post").toUpperCase(), body, headers: formHeaders(csrf), priority: true, ...options });
  }

  function post(url, { csrf, body, ...options } = {}) {
    return request(new URL(url, location.origin).href, { method: "POST", body, headers: formHeaders(csrf), priority: true, ...options });
  }

  async function fetchBuildings(options = {}) {
    const result = await getJson(`/api/buildings?_=${Date.now()}`, options);
    return Array.isArray(result) ? result : result?.result || [];
  }

  // Öffentliche Fremddaten (Katalog, Adresssuche) ohne Cookies und ohne Spielerdaten.
  function externalJson(url) {
    if (typeof GM_xmlhttpRequest === "function") {
      return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
          method: "GET",
          url,
          responseType: "json",
          timeout: 20000,
          anonymous: true,
          onload: (response) => {
            if (response.status < 200 || response.status >= 300) return reject(new Error(`${response.status} ${response.statusText || "Fehler"}`));
            try {
              resolve(response.response ?? JSON.parse(response.responseText));
            } catch (error) {
              reject(new Error(`Ungültige Antwort: ${error.message}`));
            }
          },
          ontimeout: () => reject(new Error("Zeitüberschreitung")),
          onerror: () => reject(new Error("Netzwerkfehler")),
        });
      });
    }
    return fetch(url, { credentials: "omit", headers: { Accept: "application/json" } }).then((response) => {
      if (!response.ok) throw httpError(response, url);
      return response.json();
    });
  }

  let parser = null;
  const parseHtml = (html) => (parser ||= new DOMParser()).parseFromString(html || "", "text/html");

  function gmResource(name) {
    try {
      return typeof GM_getResourceText === "function" ? GM_getResourceText(name) || "" : "";
    } catch {
      return "";
    }
  }

  /* ---------- Design und Effekte ---------- */

  const appearance = { theme: "auto", effects: "auto" };
  const roots = new Set();
  let lowEnd = null;
  let activeCount = 0;
  let themeObserver = null;
  let themeFrame = 0;

  function pageTheme() {
    const html = document.documentElement;
    const body = document.body;
    const marks = `${html.dataset.theme || ""} ${html.dataset.bsTheme || ""} ${body.dataset.theme || ""} ${body.dataset.bsTheme || ""}`;
    if (/dark/i.test(marks) || html.classList.contains("dark") || body.classList.contains("dark")) return "dark";
    const color = getComputedStyle(body).backgroundColor.match(/[\d.]+/g)?.slice(0, 3).map(Number);
    if (color?.length === 3 && color[0] * 0.299 + color[1] * 0.587 + color[2] * 0.114 < 105) return "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  // Schwächere Geräte: wenige Kerne, wenig Speicher oder gewünschte reduzierte Transparenz.
  function isLowEndDevice() {
    if (lowEnd === null) {
      lowEnd = (navigator.hardwareConcurrency || 8) <= 4
        || (navigator.deviceMemory || 8) <= 4
        || Boolean(window.matchMedia?.("(prefers-reduced-transparency: reduce)").matches);
    }
    return lowEnd;
  }

  function applyAppearance() {
    if (!roots.size) return;
    const theme = appearance.theme === "auto" ? pageTheme() : appearance.theme;
    const lite = appearance.effects === "reduced" || (appearance.effects === "auto" && isLowEndDevice());
    for (const root of roots) {
      if (root.dataset.theme !== theme) root.dataset.theme = theme;
      root.classList.toggle(`${P}-lite`, lite);
    }
  }

  function setAppearance(patch) {
    Object.assign(appearance, patch);
    applyAppearance();
  }

  // Das Spiel ändert Klassen an <html>/<body> ständig. Beobachtet wird nur, solange eine
  // eigene Oberfläche offen ist, und höchstens einmal pro Bild neu bewertet.
  const OWN_CLASSES = /\b(?:lss(?:fo|wp)-[\w-]+|leaflet-[\w-]+)\b/g;
  const stripOwn = (value) => String(value || "").replace(OWN_CLASSES, "").replace(/\s+/g, " ").trim();

  function startThemeObserver() {
    themeObserver ||= new MutationObserver((mutations) => {
      if (appearance.theme !== "auto" || themeFrame) return;
      const relevant = mutations.some((mutation) => mutation.attributeName !== "class" || stripOwn(mutation.oldValue) !== stripOwn(mutation.target.getAttribute("class")));
      if (!relevant) return;
      themeFrame = requestAnimationFrame(() => {
        themeFrame = 0;
        applyAppearance();
      });
    });
    const options = { attributes: true, attributeOldValue: true, attributeFilter: ["class", "style", "data-theme", "data-bs-theme"] };
    themeObserver.observe(document.documentElement, options);
    themeObserver.observe(document.body, options);
  }

  function activate() {
    activeCount += 1;
    if (activeCount === 1) {
      applyAppearance();
      startThemeObserver();
    }
  }

  function deactivate() {
    activeCount = Math.max(0, activeCount - 1);
    if (!activeCount) themeObserver?.disconnect();
  }

  window.matchMedia?.("(prefers-color-scheme: dark)").addEventListener?.("change", () => {
    if (activeCount) applyAppearance();
  });

  /* ---------- Stylesheets, Wurzeln und Aktionen ---------- */

  function addStyle(id, css) {
    if (!css || document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = css;
    (document.head || document.documentElement).appendChild(style);
  }

  // Leaflet- und Oberflächen-Stile erst, wenn tatsächlich etwas angezeigt wird.
  function ensureStyles() {
    if (config.leafletCss) addStyle("lss-leaflet-style", gmResource(config.leafletCss));
    addStyle(`${P}-style`, config.styles?.ui);
  }

  const handlers = { click: new Map(), change: new Map(), input: new Map() };
  const ATTRIBUTES = { click: "action", change: "change", input: "input" };

  function on(groups) {
    for (const [type, entries] of Object.entries(groups)) {
      for (const [name, handler] of Object.entries(entries)) handlers[type].set(name, handler);
    }
  }

  function dispatch(event) {
    const attribute = ATTRIBUTES[event.type];
    const element = event.target.closest?.(`[data-${attribute}]`);
    if (!element || !event.currentTarget.contains(element)) return;
    if (event.type === "click" && element.disabled) return;
    handlers[event.type].get(element.dataset[attribute])?.(element, event);
  }

  function createRoot(id, className = "") {
    ensureStyles();
    const root = document.createElement("div");
    root.id = id;
    root.className = `${P}-root ${className}`.trim();
    for (const type of Object.keys(ATTRIBUTES)) root.addEventListener(type, dispatch);
    // Tastenkürzel des Spiels sollen beim Tippen in eigenen Feldern nicht auslösen.
    root.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") event.stopPropagation();
    });
    document.body.appendChild(root);
    roots.add(root);
    applyAppearance();
    return root;
  }

  let layerRoot = null;
  const layer = () => (layerRoot ||= createRoot(`${P}-layer`, `${P}-layer`));

  /* ---------- Symbole ---------- */

  const ICONS = {
    app: '<path d="M12 3 4 6v6c0 4.8 3.1 7.8 8 9 4.9-1.2 8-4.2 8-9V6l-8-3Z"/><path d="M8 9h8M8 13h8M12 7v8"/>',
    dashboard: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
    region: '<path d="M4 20V8l8-4 8 4v12"/><path d="M8 20v-5h8v5M8 9h.01M12 9h.01M16 9h.01"/>',
    extension: '<path d="M4 21v-8l5-3v11M9 21V7l5-3v17M14 21v-9l6-3v12M2 21h20"/>',
    gauge: '<path d="M4.9 19a9 9 0 1 1 14.2 0"/><path d="m12 13 4-4"/><circle cx="12" cy="13" r="1"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    back: '<path d="m15 18-6-6 6-6"/>',
    transfer: '<path d="M17 3l4 4-4 4M3 7h18M7 21l-4-4 4-4m14 4H3"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4"/>',
    vehicle: '<path d="M3 7h11v10H3z"/><path d="M14 10h3l3 3v4h-6z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    building: '<path d="M4 21V7l8-4 8 4v14"/><path d="M8 10h2m4 0h2m-8 4h2m4 0h2M9 21v-4h6v4"/>',
    training: '<path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 12v4c3 2 7 2 10 0v-4M21 9v6"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18m-12 5 2 2 4-4"/>',
    map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15m6-12v15"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
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
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16h.01"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    home: '<path d="M3 11.5 12 4l9 7.5M5.5 9.5V20h13V9.5"/>',
    check: '<path d="m5 12 5 5 9-10"/>',
    sort: '<path d="m8 9 4-4 4 4M16 15l-4 4-4-4"/>',
    "sort-asc": '<path d="m7 14 5-5 5 5"/>',
    "sort-desc": '<path d="m7 10 5 5 5-5"/>',
  };

  const icon = (name) => `<svg class="${P}-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name] || ICONS.app}</svg>`;
  const badge = (value, tone = "neutral", title = "") => `<span class="${P}-badge is-${tone}"${title ? ` title="${escapeHtml(title)}"` : ""}>${escapeHtml(value)}</span>`;
  const glyph = (color, name) => `<span class="${P}-dialog-glyph" style="--glyph:${color}">${icon(name)}</span>`;
  const note = (tone, html) => `<div class="${P}-note is-${tone}">${icon(tone === "success" ? "check" : tone === "info" ? "info" : "alert")}<span>${html}</span></div>`;
  const spinner = () => `<span class="${P}-spinner" aria-hidden="true"></span>`;

  function selectHtml(attributes, options, value) {
    return `<select ${attributes}>${options.map((option) => `<option value="${escapeHtml(option.value)}"${String(option.value) === String(value) ? " selected" : ""}>${escapeHtml(option.label ?? option.value ?? "–")}</option>`).join("")}</select>`;
  }

  /* ---------- Navigationsleiste ---------- */

  const isMainPage = () => location.pathname === "/" || Boolean(pageWindow.LSS_TEST_PAGE || globalThis.LSS_TEST_PAGE);

  function forumItem() {
    const link = [...document.querySelectorAll("#navbar-main-collapse a, #navbar-collapse a, .navbar a, nav a, header a")]
      .find((anchor) => /forum/i.test(`${anchor.textContent} ${anchor.title} ${anchor.getAttribute("aria-label") || ""} ${anchor.getAttribute("href") || ""}`));
    return link?.closest("li.dropdown") || link?.closest("li") || link || null;
  }

  // Ein kompaktes Symbol direkt rechts neben dem Forum-Menü. Nur auf der Hauptseite;
  // fehlt die Leiste noch, wird kurz gewartet – nie ein schwebender Ersatzknopf.
  function mountLauncher({ id, title, label, glyph: glyphHtml, onClick, after = [] }) {
    if (!isMainPage() || document.getElementById(id)) return;
    addStyle(`${P}-launcher-style`, config.styles?.launcher);
    const button = document.createElement("button");
    button.type = "button";
    button.id = id;
    button.className = `${P}-launcher`;
    button.title = title;
    button.setAttribute("aria-label", title);
    button.innerHTML = `${glyphHtml}<span>${escapeHtml(label)}</span>`;
    button.addEventListener("click", onClick);
    const place = (attempt) => {
      const reference = after.map((hostId) => document.getElementById(hostId)).find(Boolean) || forumItem();
      const parent = reference?.parentElement || document.querySelector("#navbar-main-collapse .navbar-right, #navbar-collapse .navbar-right, nav .navbar-right, .navbar .navbar-nav");
      if (!parent) {
        if (attempt < 40) setTimeout(() => place(attempt + 1), 250);
        return;
      }
      const host = document.createElement(/^(?:UL|OL)$/.test(parent.tagName) ? "li" : "span");
      host.id = `${id}-host`;
      host.className = `${P}-launcher-host`;
      if (reference?.parentElement === parent) reference.after(host);
      else parent.appendChild(host);
      host.appendChild(button);
    };
    place(0);
  }

  /* ---------- Hinweise und Dialoge ---------- */

  let toastTimer = 0;
  function toast(message) {
    const root = layer();
    let element = root.querySelector(`.${P}-toast`);
    if (!element) {
      element = document.createElement("div");
      element.className = `${P}-toast`;
      element.setAttribute("role", "status");
      element.setAttribute("aria-live", "polite");
      root.appendChild(element);
    }
    element.textContent = message;
    requestAnimationFrame(() => element.classList.add("is-visible"));
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => element.classList.remove("is-visible"), 3800);
  }

  function showPill(text) {
    const root = layer();
    if (root.querySelector(`.${P}-pill`)) return;
    root.insertAdjacentHTML("beforeend", `<div class="${P}-pill"><i></i><span>${escapeHtml(text)}</span></div>`);
    applyAppearance();
  }

  const dialogs = [];

  // Modaler Dialog im eigenen Ebenen-Element. Esc und Klick auf den Hintergrund
  // schließen immer nur den obersten Dialog.
  function openDialog({ label, size = "md", className = "", onClose } = {}) {
    const host = document.createElement("div");
    host.className = `${P}-modal`;
    host.innerHTML = `<div class="${P}-backdrop" data-action="dialog-dismiss"></div><section class="${P}-dialog is-${size} ${className}" role="dialog" aria-modal="true" aria-label="${escapeHtml(label || "")}"></section>`;
    const dialog = {
      host,
      element: host.lastElementChild,
      isOpen: true,
      render(html) {
        if (dialog.isOpen) dialog.element.innerHTML = html;
      },
      close() {
        if (!dialog.isOpen) return;
        dialog.isOpen = false;
        dialogs.splice(dialogs.indexOf(dialog), 1);
        host.classList.add("is-closing");
        setTimeout(() => host.remove(), layerRoot?.classList.contains(`${P}-lite`) ? 0 : 160);
        deactivate();
        onClose?.();
      },
    };
    dialogs.push(dialog);
    layer().appendChild(host);
    activate();
    return dialog;
  }

  const dialogOf = (element) => dialogs.find((dialog) => dialog.host.contains(element));
  on({ click: { "dialog-dismiss": (element) => dialogOf(element)?.close() } });

  function dialogHead({ kicker = "", title = "", glyph: glyphHtml = "", tools = "" }) {
    return `<header class="${P}-dialog-head"><div class="${P}-dialog-title">${glyphHtml}<div><span>${escapeHtml(kicker)}</span><h2>${escapeHtml(title)}</h2></div></div><div class="${P}-dialog-tools">${tools}<button type="button" class="${P}-icon-btn" data-action="dialog-dismiss" aria-label="Schließen" title="Schließen">${icon("close")}</button></div></header>`;
  }

  // Esc schließt den obersten eigenen Dialog, sonst fragt das Script selbst (z. B. Panel schließen).
  window.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || event.defaultPrevented || config.ignoreEscape?.()) return;
    if (dialogs.length) dialogs[dialogs.length - 1].close();
    else if (!config.onEscape?.()) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);

  /* ---------- Karten ---------- */

  // Leaflet 1.9: Zeichnet der Canvas-Renderer direkt neu (z. B. beim Einpassen der Ansicht),
  // bleibt ein bereits geplanter Frame bestehen und läuft nach dem Entfernen der Karte ins
  // Leere. Abgesichert wird nur die eigene Leaflet-Kopie des Scripts, nie die des Spiels.
  function Leaflet() {
    const L = globalThis.L;
    if (L?.Canvas && !L.Canvas.prototype.__lssSafeRedraw) {
      const redraw = L.Canvas.prototype._redraw;
      L.Canvas.prototype._redraw = function safeRedraw() {
        if (this._ctx) redraw.call(this);
        else this._redrawRequest = null;
      };
      L.Canvas.prototype.__lssSafeRedraw = true;
    }
    return L;
  }
  const TILES = {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    attribution: "Kartenbasis &copy; Esri",
  };

  function tileLayer(options = {}) {
    return Leaflet().tileLayer(TILES.url, { maxZoom: 19, keepBuffer: 3, updateWhenZooming: false, attribution: TILES.attribution, ...options });
  }

  // Laufende Animationen beenden, bevor die Karte entfernt wird (sonst greifen Leaflets
  // Zeitgeber noch auf die entfernte Karte zu).
  function removeMap(map) {
    if (!map) return;
    try {
      map.stop();
      if (map._animatingZoom) map._onZoomTransitionEnd();
    } catch { /* Karte ist bereits entfernt. */ }
    map.remove();
  }

  /* ---------- Gebäudearten ---------- */

  // Je Art: LSS-Gebäudetypen, die einen Standort abdecken, sowie Farbe und Bezeichnung im Bau-Dialog.
  const KINDS = {
    fire: { type: 0, types: [0, 18], color: "#ff6a00", label: "Feuerwache", headline: "Neue Feuerwache", exact: /^feuerwache$/i, pattern: /feuerwache/i },
    rescue: { type: 2, types: [2, 20], color: "#ff3b30", label: "Rettungswache", headline: "Neue Rettungswache", exact: /^rettungswache$/i, pattern: /rettungswache/i },
    hospital: { type: 4, types: [4], color: "#0a84ff", label: "Krankenhaus", headline: "Neues Krankenhaus", exact: /^krankenhaus$/i, pattern: /krankenhaus/i },
    police: { type: 6, types: [6, 19], color: "#1c3f94", label: "Polizeiwache", headline: "Neue Polizeiwache", exact: /^polizeiwache$/i, pattern: /polizeiwache/i },
  };
  const DISPATCH_TYPE = 7;

  const bridgeBuilding = (building) => ({
    id: Number(building.id),
    caption: building.caption,
    building_type: Number(building.building_type),
    latitude: Number(building.latitude),
    longitude: Number(building.longitude),
  });

  /* ---------- Bau-Dialog ---------- */

  const builder = (() => {
    let current = null;
    const listeners = new Set();

    async function open(station, { buildings } = {}) {
      const lat = Number(station?.lat);
      const lon = Number(station?.lon);
      if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
      current?.dialog.close();
      const kind = KINDS[station.kind] ? station.kind : "fire";
      const name = String(station.name || "Neue Wache").slice(0, 120);
      const build = {
        station: { key: String(station.key || ""), name, kind, label: String(station.label || ""), address: String(station.address || ""), district: String(station.district || "") },
        lat, lon, originLat: lat, originLon: lon, name,
        loading: true, submitting: false, error: "", done: null,
        form: null, fields: {}, submit: null, typeOptions: [], typeValue: "", dispatchOptions: [], dispatchValue: "", extras: [],
        buildings: [], map: null, built: false,
      };
      build.dialog = openDialog({
        label: "Wache bauen",
        size: "sm",
        onClose: () => {
          removeMap(build.map);
          if (current === build) current = null;
        },
      });
      current = build;
      render(build);
      const [form, list] = await Promise.allSettled([
        getHtml("/buildings/new", { priority: true }),
        buildings ? Promise.resolve(buildings) : fetchBuildings({ priority: true }),
      ]);
      if (current !== build) return;
      build.buildings = list.status === "fulfilled" ? list.value : [];
      if (form.status === "fulfilled") parseForm(form.value, build);
      else build.error = `Das Bauformular ist nicht erreichbar: ${form.reason?.message || form.reason}`;
      if (!build.form && !build.error) build.error = "Das Bauformular des Spiels wurde nicht erkannt. Nutze „Im Spielformular öffnen“.";
      build.loading = false;
      render(build);
    }

    function parseForm(html, build) {
      const doc = parseHtml(html);
      const form = doc.querySelector("form#new_building")
        || doc.querySelector('[name="building[latitude]"]')?.closest("form")
        || doc.querySelector('form[action$="/buildings"]');
      if (!form) return;
      const field = (name) => form.querySelector(`[name="building[${name}]"]`);
      const fields = { name: field("name"), type: field("building_type"), dispatch: field("leitstelle_building_id"), lat: field("latitude"), lon: field("longitude"), address: field("address") };
      if (!fields.lat || !fields.lon || !fields.type) return;
      // Gebaut wird ausschließlich mit Credits, nie mit Coins.
      const buttons = [...form.querySelectorAll('input[type="submit"], button[type="submit"], button:not([type])')];
      const buttonText = (button) => `${button.name} ${button.value} ${button.className} ${button.textContent}`.toLowerCase();
      const submit = buttons.find((button) => /credit/.test(buttonText(button)) && !/coin/.test(buttonText(button)))
        || buttons.find((button) => !/coin/.test(buttonText(button)))
        || null;
      if (buttons.length && !submit) {
        build.error = "Im Bauformular wurde kein Bau-Knopf für Credits erkannt.";
        return;
      }
      const options = (select) => (select?.tagName === "SELECT" ? [...select.options].map((option) => ({ value: option.value, label: option.textContent.trim() })) : []);
      const meta = KINDS[build.station.kind];
      build.form = form;
      build.fields = fields;
      build.submit = submit;
      build.typeOptions = options(fields.type);
      const preferred = build.typeOptions.find((option) => meta.exact.test(option.label))
        || build.typeOptions.find((option) => option.value === String(meta.type))
        || build.typeOptions.find((option) => meta.pattern.test(option.label));
      build.typeValue = preferred?.value ?? fields.type.value;
      build.dispatchOptions = options(fields.dispatch);
      const nearest = build.buildings
        .filter((building) => Number(building.building_type) === DISPATCH_TYPE)
        .map((building) => ({ building, distance: haversine(build.lat, build.lon, Number(building.latitude), Number(building.longitude)) }))
        .filter((entry) => Number.isFinite(entry.distance))
        .sort((a, b) => a.distance - b.distance)[0];
      build.dispatchValue = nearest && build.dispatchOptions.some((option) => option.value === String(nearest.building.id))
        ? String(nearest.building.id)
        : fields.dispatch?.value ?? "";
      build.extras = [...form.querySelectorAll("select[name]")]
        .filter((select) => select !== fields.type && select !== fields.dispatch)
        .map((select) => ({
          name: select.name,
          label: (select.id && textOf(doc.querySelector(`label[for="${CSS.escape(select.id)}"]`))) || textOf(select.closest(".form-group")?.querySelector("label")) || select.name,
          options: options(select),
          value: select.value,
          types: fieldBuildingTypes(select, form),
          hidden: hiddenInForm(select, form),
        }));
    }

    // Das Spielformular hat z. B. je Wachentyp ein eigenes „Start Fahrzeug“-Feld und blendet
    // nur das passende ein. Die Zuordnung ergibt sich aus Name, ID und Klassen der Umgebung.
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
        const className = typeof node.className === "string" ? node.className : "";
        if (node.hidden || /display\s*:\s*none/i.test(node.getAttribute("style") || "") || /(?:^|\s)(?:hidden|d-none)(?:\s|$)/.test(className)) return true;
      }
      return false;
    }

    // Zusatzfelder des gewählten Typs; nie zwei Felder gleicher Beschriftung
    // (passende Typzuordnung vor sichtbaren vor versteckten).
    function applicableExtras(build) {
      const type = Number(build.typeValue);
      const labels = new Set();
      return build.extras
        .map((extra, index) => ({ extra, index, rank: extra.types ? 0 : extra.hidden ? 2 : 1 }))
        .filter(({ extra }) => !extra.types || extra.types.includes(type))
        .sort((a, b) => a.rank - b.rank || a.index - b.index)
        .filter(({ extra }) => {
          const label = extra.label.toLocaleLowerCase("de");
          if (labels.has(label)) return false;
          labels.add(label);
          return true;
        })
        .sort((a, b) => a.index - b.index);
    }

    function nearbyBuilding(build) {
      const types = KINDS[build.station.kind].types;
      return build.buildings
        .filter((building) => types.includes(Number(building.building_type)))
        .map((building) => ({ building, distance: haversine(build.lat, build.lon, Number(building.latitude), Number(building.longitude)) }))
        .filter((entry) => entry.distance <= 400)
        .sort((a, b) => a.distance - b.distance)[0];
    }

    function positionText(build) {
      const shift = haversine(build.originLat, build.originLon, build.lat, build.lon);
      return `${build.lat.toFixed(5)}, ${build.lon.toFixed(5)}${shift >= 5 ? ` · ${formatNumber(Math.round(shift))} m verschoben` : ""}`;
    }

    function render(build) {
      const { station } = build;
      const meta = KINDS[station.kind];
      const head = (kicker, title) => dialogHead({ kicker, title, glyph: glyph(meta.color, "building") });
      removeMap(build.map);
      build.map = null;
      if (build.done) {
        build.dialog.render(`${head(meta.headline, build.done.caption || station.name)}
          <div class="${P}-dialog-body ${P}-center"><div class="${P}-success">${icon("check")}</div>
          <p class="${P}-dialog-text"><b>${escapeHtml(build.done.caption || station.name)}</b> wurde gebaut und ist als erledigt markiert.</p>
          <div class="${P}-actions is-center"><a class="${P}-btn" href="/buildings/${Number(build.done.id)}" target="_blank" rel="noopener">Wache öffnen ${icon("external")}</a><button type="button" class="${P}-btn is-primary" data-action="dialog-dismiss">Fertig</button></div></div>`);
        return;
      }
      if (build.loading) {
        build.dialog.render(`${head("Wache bauen", station.name)}<div class="${P}-dialog-body"><div class="${P}-empty is-small">${spinner()} Bauformular wird geladen …</div></div>`);
        return;
      }
      const position = `<span>Position <b data-build-position>${positionText(build)}</b></span>`;
      build.dialog.render(`${head(`Wache bauen${station.label ? ` · ${station.label}` : ""}`, station.name)}
        <div class="${P}-dialog-body">
          <div data-build-notes></div>
          <div class="${P}-build">
            ${Leaflet() ? `<div class="${P}-build-map" aria-label="Bauposition – Marker kann verschoben werden"></div>` : ""}
            <div class="${P}-build-meta">${position}${station.address ? `<span>Adresse <b>${escapeHtml(station.address)}</b></span>` : ""}${station.district ? `<span>Bezirk <b>${escapeHtml(station.district)}</b></span>` : ""}</div>
            <div class="${P}-build" data-build-fields></div>
            <div class="${P}-actions" data-build-actions></div>
          </div>
        </div>`);
      initMap(build);
      refresh(build);
    }

    // Aktualisiert Hinweise, Felder und Knöpfe – die Karte bleibt dabei bestehen.
    function refresh(build) {
      const element = build.dialog.element;
      const notes = element.querySelector("[data-build-notes]");
      if (!notes) return;
      const nearby = nearbyBuilding(build);
      notes.innerHTML = (build.error ? note("error", escapeHtml(build.error)) : "")
        + (nearby ? note("warn", `In ${formatNumber(Math.round(nearby.distance))} m Entfernung steht bereits <b>${escapeHtml(nearby.building.caption)}</b>.`) : "");
      const fields = element.querySelector("[data-build-fields]");
      if (build.form) {
        const moreOpen = Boolean(fields.querySelector("details")?.open);
        const maxLength = Number(build.fields.name?.maxLength) > 0 ? Number(build.fields.name.maxLength) : 120;
        const extras = applicableExtras(build).filter(({ extra }) => extra.options.length > 1);
        fields.innerHTML = `<label class="${P}-field"><span>Name</span><input type="text" data-input="kit-build-field" data-field="name" maxlength="${maxLength}" value="${escapeHtml(build.name)}"></label>
          <div class="${P}-build-row">
            ${build.typeOptions.length ? `<label class="${P}-field"><span>Gebäudetyp</span>${selectHtml('data-change="kit-build-type" data-field="type"', build.typeOptions, build.typeValue)}</label>` : ""}
            ${build.dispatchOptions.length ? `<label class="${P}-field"><span>Leitstelle</span>${selectHtml('data-change="kit-build-field" data-field="dispatch"', build.dispatchOptions, build.dispatchValue)}</label>` : ""}
          </div>
          ${extras.length ? `<details class="${P}-more"${moreOpen ? " open" : ""}><summary>Weitere Optionen</summary><div>${extras.map(({ extra, index }) => `<label class="${P}-field"><span>${escapeHtml(extra.label)}</span>${selectHtml(`data-change="kit-build-field" data-extra="${index}"`, extra.options, extra.value)}</label>`).join("")}</div></details>` : ""}`;
      } else {
        fields.innerHTML = "";
      }
      element.querySelector("[data-build-actions]").innerHTML = `<button type="button" class="${P}-btn" data-action="kit-build-native">Im Spielformular öffnen</button>
        <button type="button" class="${P}-btn" data-action="dialog-dismiss">Abbrechen</button>
        ${build.form ? `<button type="button" class="${P}-btn is-primary" data-action="kit-build-submit"${build.submitting ? " disabled" : ""}>${build.submitting ? `${spinner()} Wird gebaut …` : "Mit Credits bauen"}</button>` : ""}`;
    }

    function initMap(build) {
      const L = Leaflet();
      const container = build.dialog.element.querySelector(`.${P}-build-map`);
      if (!L || !container) return;
      const map = L.map(container, { zoomControl: false, attributionControl: false }).setView([build.lat, build.lon], 16);
      tileLayer().addTo(map);
      L.circleMarker([build.originLat, build.originLon], { radius: 5, color: "#8e8e93", fillOpacity: 0.6, weight: 1 }).addTo(map);
      const marker = L.marker([build.lat, build.lon], {
        draggable: true,
        keyboard: false,
        icon: L.divIcon({ className: `${P}-drag-pin`, html: `<div style="--pin:${KINDS[build.station.kind].color}"></div>`, iconSize: [26, 26], iconAnchor: [13, 13] }),
      }).addTo(map);
      marker.on("dragend", () => {
        const position = marker.getLatLng();
        build.lat = position.lat;
        build.lon = position.lng;
        const label = build.dialog.element.querySelector("[data-build-position]");
        if (label) label.textContent = positionText(build);
        refresh(build);
      });
      build.map = map;
      setTimeout(() => map.invalidateSize(), 60);
    }

    function readInputs(build) {
      const element = build.dialog.element;
      const value = (selector) => element.querySelector(selector)?.value;
      build.name = value('[data-field="name"]') ?? build.name;
      build.typeValue = value('[data-field="type"]') ?? build.typeValue;
      build.dispatchValue = value('[data-field="dispatch"]') ?? build.dispatchValue;
      for (const select of element.querySelectorAll("[data-extra]")) {
        const extra = build.extras[Number(select.dataset.extra)];
        if (extra) extra.value = select.value;
      }
    }

    async function submit() {
      const build = current;
      if (!build?.form || build.submitting) return;
      readInputs(build);
      if (!build.name.trim()) {
        build.error = "Bitte einen Namen eingeben.";
        refresh(build);
        return;
      }
      build.submitting = true;
      build.error = "";
      refresh(build);
      try {
        const { form, fields } = build;
        if (fields.name) fields.name.value = build.name.trim();
        if (fields.type && build.typeValue !== "") fields.type.value = build.typeValue;
        if (fields.dispatch) fields.dispatch.value = build.dispatchValue;
        fields.lat.value = build.lat.toFixed(7);
        fields.lon.value = build.lon.toFixed(7);
        if (fields.address && build.station.address) fields.address.value = build.station.address;
        // Nur die Zusatzfelder des gewählten Typs mitsenden; deaktivierte Felder lässt FormData weg.
        const applicable = new Set(applicableExtras(build).map(({ extra }) => extra.name));
        for (const extra of build.extras) {
          const select = form.querySelector(`select[name="${CSS.escape(extra.name)}"]`);
          if (!select) continue;
          select.disabled = !applicable.has(extra.name);
          select.value = extra.value;
        }
        const knownIds = new Set(build.buildings.map((building) => Number(building.id)));
        const response = await submitForm(form, build.submit?.name ? [[build.submit.name, build.submit.value || "1"]] : []);
        const answer = await response.text().catch(() => "");
        const created = createdFromResponse(response, knownIds, build) || await confirmCreated(knownIds, build.lat, build.lon);
        if (!created) throw new Error(formErrorText(answer) || "Das Spiel hat keine neue Wache bestätigt. Prüfe deine Credits oder nutze „Im Spielformular öffnen“.");
        build.done = created;
        for (const listener of listeners) listener(created, build.station);
      } catch (error) {
        build.error = `Bauen fehlgeschlagen: ${error.message}`;
      } finally {
        build.submitting = false;
        if (current === build) {
          if (build.done) render(build);
          else refresh(build);
        }
      }
    }

    // Leitet das Spiel nach dem Bauen auf die neue Wache weiter, steht ihre ID schon fest.
    function createdFromResponse(response, knownIds, build) {
      const id = Number(String(response.url || "").match(/\/buildings\/(\d+)(?:[/?#]|$)/)?.[1]);
      if (!id || knownIds.has(id)) return null;
      return { id, caption: build.name.trim(), building_type: Number(build.typeValue), latitude: build.lat, longitude: build.lon };
    }

    async function confirmCreated(knownIds, lat, lon) {
      for (const wait of [600, 1500, 3000]) {
        await sleep(wait);
        const list = await fetchBuildings({ priority: true, retries: 0 }).catch(() => []);
        const created = list.find((building) => !knownIds.has(Number(building.id)) && haversine(lat, lon, Number(building.latitude), Number(building.longitude)) <= 250);
        if (created) return created;
      }
      return null;
    }

    function formErrorText(html) {
      return [...parseHtml(html).querySelectorAll(".alert-danger, .alert-error, #error_explanation, .has-error .help-block, .help-block.error")]
        .map(textOf)
        .filter(Boolean)
        .join(" · ")
        .slice(0, 260);
    }

    // Ausweichweg: füllt das originale Bauformular des Spiels aus; gebaut wird über dessen Knopf.
    async function openNative() {
      const build = current;
      if (!build) return;
      readInputs(build);
      const { lat, lon, name, typeValue, dispatchValue, station } = build;
      build.dialog.close();
      config.onNativeBuild?.();
      const trigger = document.querySelector('#build_new_building, a[href="/buildings/new"], a[href$="/buildings/new"]');
      if (!trigger) {
        try { await navigator.clipboard.writeText(`${lat.toFixed(6)}, ${lon.toFixed(6)}`); } catch { /* Kopieren ist optional. */ }
        toast("Knopf „Neues Gebäude bauen“ nicht gefunden – die Koordinaten wurden kopiert.");
        return;
      }
      trigger.click();
      let form = null;
      for (let attempt = 0; attempt < 40 && !form; attempt += 1) {
        await sleep(150);
        form = document.querySelector('[name="building[latitude]"]')?.closest("form") || null;
      }
      if (!form) {
        toast("Das Spielformular wurde nicht rechtzeitig geladen.");
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
      try { pageWindow.map?.setView?.([lat, lon], 17); } catch { /* Die Spielkarte ist optional. */ }
      form.scrollIntoView({ block: "center", behavior: "smooth" });
      toast("Spielformular ausgefüllt – Position prüfen und im Spiel bauen.");
    }

    on({
      click: {
        "kit-build-submit": () => void submit(),
        "kit-build-native": () => void openNative(),
      },
      change: {
        "kit-build-type": () => {
          if (!current) return;
          readInputs(current);
          refresh(current);
        },
        "kit-build-field": () => current && readInputs(current),
      },
      input: {
        "kit-build-field": () => current && readInputs(current),
      },
    });

    return {
      open,
      onBuilt: (listener) => listeners.add(listener),
      isOpen: () => Boolean(current),
    };
  })();

  /* ---------- Zustimmung und Wachenplaner-Webseite ---------- */

  function requestConsent({ key, kicker, text }) {
    if (session.get(key) === "1") return Promise.resolve(true);
    return new Promise((resolve) => {
      let answered = false;
      const dialog = openDialog({ label: "Abgleich erlauben?", size: "sm", onClose: () => answered || resolve(false) });
      dialog.allow = () => {
        answered = true;
        session.set(key, "1");
        dialog.close();
        resolve(true);
      };
      dialog.render(`${dialogHead({ kicker, title: "Abgleich erlauben?", glyph: glyph("#007aff", "map") })}
        <div class="${P}-dialog-body"><p class="${P}-dialog-text">${text}</p>
        <div class="${P}-actions"><button type="button" class="${P}-btn" data-action="dialog-dismiss">Ablehnen</button><button type="button" class="${P}-btn is-primary" data-action="kit-consent-allow">Erlauben</button></div></div>`);
    });
  }

  on({ click: { "kit-consent-allow": (element) => dialogOf(element)?.allow?.() } });

  // Die Webversion des Wachenplaners öffnet das Spiel mit ?lssfo=planner. Nachrichten werden
  // nur vom öffnenden Fenster angenommen; Gebäudedaten gehen erst nach Zustimmung hinaus.
  function startBridge({ sessionKey, consentKey, pill, kicker, consentText, delay = 0, shouldYield }) {
    let opener = null;
    try {
      let active = new URLSearchParams(location.search).get("lssfo") === "planner";
      if (active) session.set(sessionKey, "1");
      else active = session.get(sessionKey) === "1";
      opener = active && window.opener && !window.opener.closed ? window.opener : null;
    } catch {
      opener = null;
    }
    if (!opener) return;
    // Der Wachenplaner läuft oft als lokale Datei (Herkunft „null“), daher "*".
    // Empfänger ist ausschließlich das Fenster, das diesen Tab geöffnet hat.
    const send = (message) => {
      try { opener.postMessage({ source: "lssfo-game", ...message }, "*"); } catch { /* Webseite wurde geschlossen. */ }
    };
    const onMessage = async (event) => {
      if (event.source !== opener || event.data?.source !== "lssfo-planner") return;
      if (event.data.type === "lssfo-build") void builder.open(event.data.station);
      if (event.data.type !== "lssfo-sync") return;
      if (!(await requestConsent({ key: consentKey, kicker, text: consentText }))) {
        send({ type: "lssfo-denied" });
        return;
      }
      try {
        const buildings = await fetchBuildings({ priority: true });
        send({ type: "lssfo-buildings", buildings: buildings.map(bridgeBuilding) });
        toast(`${plural(buildings.length, "Gebäude", "Gebäude")} an die Wachenplaner-Webseite übertragen`);
      } catch (error) {
        toast(`Abgleich fehlgeschlagen: ${error.message}`);
      }
    };
    const begin = () => {
      if (shouldYield?.()) return;
      document.documentElement.dataset.lssPlannerBridge = P;
      showPill(pill);
      window.addEventListener("message", onMessage);
      builder.onBuilt((building, station) => send({ type: "lssfo-built", stationKey: station.key, building: bridgeBuilding(building) }));
      send({ type: "lssfo-ready" });
    };
    if (delay) setTimeout(begin, delay);
    else begin();
  }

  return {
    prefix: P,
    pageWindow,
    // Formatierung
    escapeHtml, formatNumber, formatDecimal, formatDistance, formatDateTime, plural, textOf, collator, haversine,
    // Ablauf
    sleep, isAbort, abortError, store, session,
    // Netzwerk
    request, getHtml, getJson, submitForm, post, fetchBuildings, externalJson, parseHtml, csrfToken, gmResource,
    // Oberfläche
    createRoot, layer, on, activate, deactivate, setAppearance, applyAppearance, icon, badge, glyph, note, spinner, selectHtml,
    mountLauncher, toast, showPill, openDialog, dialogOf, dialogHead,
    // Karten und Bauen
    Leaflet, tileLayer, removeMap, KINDS, DISPATCH_TYPE, bridgeBuilding, build: builder, startBridge,
  };
}

if (typeof module === "object" && module.exports) module.exports = { createKit };

// ---- lss_verwaltung/src/core.js ----
/*
 * Rechenkern der LSS Verwaltung: reine Funktionen ohne DOM und ohne Netzwerk.
 * Im Script als lokale Konstante eingebunden, mit Node direkt testbar (tests/core.test.js).
 */
const LSSFleetCore = (() => {
  const number = (value, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  };
  const sum = (items, valueOf) => items.reduce((total, item) => total + number(valueOf(item)), 0);

  /* ---------- Fahrzeuge und Wachen ---------- */

  function vehicleStaff(type) {
    const staff = type?.staff || {};
    return { min: number(staff.min ?? type?.minPersonnel), max: number(staff.max ?? type?.maxPersonnel) };
  }

  // Soll-Besatzung: Minimum des Typs oder Maximum – eine im Spiel gesetzte Höchstbesatzung hat Vorrang.
  function targetCrew(vehicle, type, mode = "max") {
    const staff = vehicleStaff(type);
    if (mode === "min") return staff.min;
    const override = number(vehicle?.max_personnel_override, 0);
    return override > 0 ? override : staff.max;
  }

  const assignedCrew = (vehicle) => number(vehicle?.assigned_personnel_count);

  function flattenTraining(type, allowedSchools = null) {
    const result = [];
    for (const [school, entries] of Object.entries(type?.staff?.training || {})) {
      if (Array.isArray(allowedSchools) && allowedSchools.length && !allowedSchools.includes(school)) continue;
      for (const [key, rule] of Object.entries(entries || {})) result.push({ school, key, rule: rule || {} });
    }
    return result;
  }

  const requiredTrainingCount = (rule, target) => (rule?.all ? target : Math.max(0, number(rule?.min)));

  function analyzeVehicle(vehicle, type, building, mode = "max", educationScan = null) {
    const staff = vehicleStaff(type);
    const target = targetCrew(vehicle, type, mode);
    const assigned = assignedCrew(vehicle);
    // Nach einer Prüfung zählt eine fehlende Ausbildung als 0 vorhanden – nicht als „ungeprüft“.
    const training = flattenTraining(type, building?.schoolingTypes).map((requirement) => {
      const required = requiredTrainingCount(requirement.rule, target);
      const actual = educationScan ? number(educationScan.counts?.[requirement.key]) : null;
      return { ...requirement, required, actual, missing: actual === null ? null : Math.max(0, required - actual) };
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
      missingTraining: training.reduce((total, item) => total + (item.missing || 0), 0),
      educationScanned: Boolean(educationScan),
    };
  }

  function groupBy(items, keyOf) {
    const groups = new Map();
    for (const item of items) {
      const key = keyOf(item);
      const group = groups.get(key);
      if (group) group.push(item);
      else groups.set(key, [item]);
    }
    return groups;
  }

  function summarizeBuildings(buildings, analyzedVehicles) {
    const vehiclesByBuilding = groupBy(analyzedVehicles, (vehicle) => vehicle.buildingId);
    return buildings.map((building) => {
      const vehicles = vehiclesByBuilding.get(number(building.id)) || [];
      const personnel = number(building.personal_count);
      const assigned = sum(vehicles, (vehicle) => vehicle.assigned);
      return {
        id: number(building.id),
        caption: building.caption || `Wache ${building.id}`,
        typeId: number(building.building_type, -1),
        personnel,
        personnelTarget: number(building.personal_count_target),
        assigned,
        free: Math.max(0, personnel - assigned),
        vehicles: vehicles.length,
        targetCrew: sum(vehicles, (vehicle) => vehicle.target),
        missingCrew: sum(vehicles, (vehicle) => vehicle.missingCrew),
        missingTraining: sum(vehicles, (vehicle) => vehicle.missingTraining),
        enabled: building.enabled !== false,
      };
    });
  }

  function summarizeTraining(analyzedVehicles) {
    const map = new Map();
    for (const vehicle of analyzedVehicles) {
      for (const item of vehicle.training) {
        const key = `${item.school}:${item.key}`;
        let aggregate = map.get(key);
        if (!aggregate) {
          aggregate = { key: item.key, school: item.school, required: 0, actual: 0, missing: 0, scannedVehicles: 0, vehicles: 0 };
          map.set(key, aggregate);
        }
        aggregate.required += item.required;
        aggregate.vehicles += 1;
        if (item.actual !== null) {
          aggregate.actual += item.actual;
          aggregate.missing += item.missing;
          aggregate.scannedVehicles += 1;
        }
      }
    }
    return [...map.values()].sort((a, b) => a.school.localeCompare(b.school) || a.key.localeCompare(b.key));
  }

  /* ---------- Gebäudearten ---------- */

  function normalizedDispatchId(value) {
    const id = Number(value);
    return value !== null && value !== undefined && value !== "" && Number.isFinite(id) && id > 0 ? id : null;
  }

  // Leitstellen zählen mit, führen aber weder Personal noch Fahrzeuge.
  function isDispatchCenter(building, type, referencedIds) {
    return referencedIds.has(number(building.id))
      || number(building.building_type, -1) === 7
      || type?.isDispatchCenter === true
      || type?.is_dispatch_center === true
      || /leitstell|dispatch/i.test(type?.caption || "");
  }

  function isOperational(building) {
    if (building.isDispatchCenter) return false;
    if (building.vehicles.length || number(building.personal_count) > 0 || number(building.personal_count_target) > 0) return true;
    return !/schule|akademie|leitstell|dispatch|krankenhaus|hospital|bereitstellungsraum|verband/i.test(building.typeCaption || "");
  }

  const isSchool = (type, caption) => Boolean(type?.school || type?.isSchool || type?.is_school) || /schule|akademie/i.test(`${type?.caption || ""} ${caption || ""}`);

  /* ---------- Bereitschaft ---------- */

  function readinessScore({ targetCrew = 0, missingCrew = 0, missingTraining = 0, buildings = 0, inactive = 0 }) {
    if (!buildings || inactive >= buildings) return 0;
    const crewPenalty = targetCrew ? Math.min(55, (missingCrew / targetCrew) * 100) : 0;
    const trainingPenalty = targetCrew ? Math.min(25, (missingTraining / targetCrew) * 80) : 0;
    const inactivePenalty = Math.min(20, (inactive / buildings) * 35);
    return Math.max(0, Math.round(100 - crewPenalty - trainingPenalty - inactivePenalty));
  }

  const readinessTone = (score) => (score >= 90 ? "ok" : score >= 70 ? "warn" : score > 0 ? "danger" : "neutral");

  /* ---------- Ausbauten ---------- */

  // Vorhandene Ausbauten (aktiv, inaktiv, im Bau) und laut Katalog noch mögliche.
  function extensionRows(building, type, now = Date.now()) {
    const raw = type?.extensions || type?.extension || [];
    const catalog = Array.isArray(raw)
      ? raw
      : Object.entries(raw).map(([id, entry]) => (typeof entry === "string" ? { id, caption: entry } : { id, ...entry }));
    const idOf = (entry, index) => entry.type_id ?? entry.id ?? index;
    const captions = new Map(catalog.map((entry, index) => [String(idOf(entry, index)), entry.caption || entry.name]));
    const owned = Array.isArray(building.extensions) ? building.extensions : [];
    const base = { buildingId: building.id, buildingCaption: building.caption, buildingType: building.typeCaption, dispatchCenterCaption: building.dispatchCenterCaption, district: building.district };
    const rows = owned.map((extension, index) => {
      const id = idOf(extension, index);
      const availableAt = extension.available_at ? new Date(extension.available_at) : null;
      const running = Boolean(availableAt) && availableAt.valueOf() > now;
      return {
        ...base,
        id,
        caption: extension.caption || extension.name || captions.get(String(id)) || `Ausbau ${id}`,
        status: running ? "building" : extension.enabled === false || extension.active === false ? "inactive" : "active",
        availableAt: running ? availableAt : null,
      };
    });
    const ownedIds = new Set(owned.map((extension, index) => String(idOf(extension, index))));
    catalog.forEach((entry, index) => {
      const id = idOf(entry, index);
      if (!ownedIds.has(String(id))) rows.push({ ...base, id, caption: entry.caption || entry.name || `Ausbau ${id}`, status: "missing", availableAt: null });
    });
    return rows;
  }

  /* ---------- Personalplanung ---------- */

  function personnelRow(building, scan) {
    const summary = building.summary || {};
    const targetCrewValue = number(summary.targetCrew);
    const personnel = number(summary.personnel);
    const assigned = number(summary.assigned);
    const required = {};
    for (const vehicle of building.vehicles) {
      for (const training of vehicle.training) required[training.key] = (required[training.key] || 0) + training.required;
    }
    const qualificationBalance = Object.keys({ ...required, ...(scan?.counts || {}) }).map((key) => {
      const requiredCount = number(required[key]);
      const available = number(scan?.counts?.[key]);
      return { key, required: requiredCount, available, difference: available - requiredCount, names: scan?.names?.[key] || [] };
    });
    return {
      ...building,
      personnel,
      targetCrew: targetCrewValue,
      assigned,
      unassigned: Math.max(0, personnel - assigned),
      reserve: Math.max(0, personnel - targetCrewValue),
      shortage: Math.max(0, targetCrewValue - personnel),
      assignmentGap: number(summary.missingCrew),
      trainingGap: scan ? sum(qualificationBalance, (entry) => Math.max(0, -entry.difference)) : number(summary.missingTraining),
      personnelScan: scan || null,
      qualificationBalance,
    };
  }

  // Vorschläge: freies Personal zuweisen, Reserve zuerst innerhalb derselben Leitstelle
  // verschieben, nach der Detailprüfung auch Ausbildungsüberschüsse. Jede Reserve wird
  // nur einmal verplant.
  function suggestTransfers(rows, trainingName = (key) => key) {
    const sameDispatch = (a, b) => a.dispatchCenterId === b.dispatchCenterId;
    const suggestions = rows
      .filter((row) => row.assignmentGap > 0 && row.unassigned > 0)
      .map((row) => ({ kind: "assign", to: row, amount: Math.min(row.assignmentGap, row.unassigned), sameDispatch: true }));
    const reserve = new Map(rows.filter((row) => row.reserve > 0).map((row) => [row.id, row.reserve]));
    const donors = rows.filter((row) => row.reserve > 0);
    for (const target of rows.filter((row) => row.shortage > 0).sort((a, b) => b.shortage - a.shortage)) {
      let remaining = target.shortage;
      const ordered = donors.slice().sort((a, b) => Number(sameDispatch(b, target)) - Number(sameDispatch(a, target)) || reserve.get(b.id) - reserve.get(a.id));
      for (const donor of ordered) {
        const available = reserve.get(donor.id);
        if (!remaining) break;
        if (available <= 0 || donor.id === target.id) continue;
        const amount = Math.min(remaining, available);
        reserve.set(donor.id, available - amount);
        remaining -= amount;
        suggestions.push({ kind: "transfer", from: donor, to: target, amount, sameDispatch: sameDispatch(donor, target) });
      }
    }
    const surplus = new Map();
    for (const row of rows) for (const entry of row.qualificationBalance) if (entry.difference > 0) surplus.set(`${row.id}:${entry.key}`, entry.difference);
    for (const target of rows) {
      for (const deficit of target.qualificationBalance.filter((entry) => entry.difference < 0)) {
        let needed = -deficit.difference;
        const donorsForKey = rows
          .filter((row) => row.id !== target.id && surplus.get(`${row.id}:${deficit.key}`) > 0)
          .sort((a, b) => Number(sameDispatch(b, target)) - Number(sameDispatch(a, target)) || surplus.get(`${b.id}:${deficit.key}`) - surplus.get(`${a.id}:${deficit.key}`));
        for (const donor of donorsForKey) {
          if (!needed) break;
          const key = `${donor.id}:${deficit.key}`;
          const amount = Math.min(needed, surplus.get(key));
          surplus.set(key, surplus.get(key) - amount);
          needed -= amount;
          suggestions.push({ kind: "qualification", from: donor, to: target, amount, qualification: trainingName(deficit.key), sameDispatch: sameDispatch(donor, target) });
        }
      }
    }
    return suggestions;
  }

  /* ---------- Auslastung ---------- */

  // Niedrig/hoch relativ zum 30-Tage-Durchschnitt desselben Fahrzeugtyps; bei Einzelstücken
  // dient der Durchschnitt aller Fahrzeuge als Bezug.
  function rateUtilization(rows) {
    const overall = sum(rows, (row) => row.distance30d) / Math.max(1, rows.length);
    const byType = new Map();
    for (const row of rows) {
      const entry = byType.get(row.typeId) || { total: 0, count: 0 };
      entry.total += row.distance30d;
      entry.count += 1;
      byType.set(row.typeId, entry);
    }
    for (const row of rows) {
      const entry = byType.get(row.typeId);
      const average = entry.count > 1 ? entry.total / entry.count : overall;
      row.typeAverage30d = average;
      row.utilization = average <= 0 ? "unknown" : row.distance30d > average * 1.5 ? "high" : row.distance30d < average * 0.35 ? "low" : "normal";
    }
    return rows;
  }

  function topGroup(rows, keyOf) {
    const totals = new Map();
    for (const row of rows) totals.set(keyOf(row), (totals.get(keyOf(row)) || 0) + row.distance30d);
    let best = { caption: "–", distance: 0 };
    for (const [caption, distance] of totals) if (distance > best.distance) best = { caption, distance };
    return best;
  }

  /* ---------- Ausbildungen und Lehrgänge ---------- */

  function trainingCatalog(schoolingTypes) {
    const names = new Map();
    const durations = new Map();
    for (const school of Object.values(schoolingTypes || {})) {
      const entries = Array.isArray(school) ? school : Object.entries(school || {}).map(([key, value]) => (typeof value === "string" ? { key, caption: value } : { key, ...value }));
      for (const entry of entries) {
        if (entry?.key && entry.caption && !names.has(entry.key)) names.set(entry.key, entry.caption);
        const days = Number(String(entry?.duration || "").match(/(\d+)\s*Tag/i)?.[1]);
        if (entry?.caption && days) durations.set(String(entry.caption).trim().toLowerCase(), days);
      }
    }
    return { names, durations };
  }

  const humanizeKey = (key) => String(key).replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

  // /api/schoolings liefert je Lehrgang Titel, Schule (building_id), Ende, Status und freie
  // Plätze. Der Beginn ergibt sich aus der Lehrgangsdauer im Katalog.
  function courseRows(schoolings, buildingCaptions, durations) {
    return schoolings.map((course) => {
      const title = course.education_title || course.caption || course.name || `Lehrgang ${course.id ?? ""}`;
      const finishRaw = course.finish_time || course.finish_at || "";
      const finish = finishRaw ? new Date(finishRaw) : null;
      const validFinish = finish && !Number.isNaN(finish.valueOf()) ? finish : null;
      const days = durations.get(String(title).trim().toLowerCase());
      return {
        id: course.id,
        title,
        school: buildingCaptions.get(number(course.building_id)) || course.building_caption || "",
        running: course.running !== false,
        start: validFinish && days ? new Date(validFinish.valueOf() - days * 86400000) : null,
        finish: validFinish,
        openSpaces: Number.isFinite(Number(course.open_spaces)) && course.open_spaces !== null ? Number(course.open_spaces) : null,
      };
    });
  }

  function relativeTime(date, now = Date.now()) {
    if (!(date instanceof Date) || Number.isNaN(date.valueOf())) return "–";
    const minutes = Math.max(0, Math.ceil((date.valueOf() - now) / 60000));
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    return days ? `noch ${days} T. ${hours} Std.` : `noch ${hours} Std. ${minutes % 60} Min.`;
  }

  /* ---------- Tabellen und Export ---------- */

  // Zahlen numerisch, Datumswerte zeitlich, Texte natürlich; leere Werte immer zuletzt.
  function compareValues(left, right, collator) {
    const empty = (value) => value === null || value === undefined || value === "" || (typeof value === "number" && Number.isNaN(value));
    if (empty(left) || empty(right)) return empty(left) - empty(right);
    if (left instanceof Date || right instanceof Date) return Number(left) - Number(right);
    if (typeof left === "number" && typeof right === "number") return left - right;
    return collator ? collator.compare(String(left), String(right)) : String(left).localeCompare(String(right));
  }

  function toCsv(header, rows) {
    const cell = (value) => {
      const text = value instanceof Date ? value.toLocaleString("de-DE") : typeof value === "number" ? String(value).replace(".", ",") : String(value ?? "");
      return `"${text.replaceAll('"', '""')}"`;
    };
    return [header, ...rows].map((row) => row.map(cell).join(";")).join("\r\n");
  }

  return {
    number, groupBy,
    vehicleStaff, targetCrew, assignedCrew, flattenTraining, requiredTrainingCount, analyzeVehicle, summarizeBuildings, summarizeTraining,
    normalizedDispatchId, isDispatchCenter, isOperational, isSchool,
    readinessScore, readinessTone, extensionRows, personnelRow, suggestTransfers, rateUtilization, topGroup,
    trainingCatalog, humanizeKey, courseRows, relativeTime, compareValues, toCsv,
  };
})();

if (typeof module === "object" && module.exports) module.exports = LSSFleetCore;

// ---- lss_verwaltung/src/app.js ----
/*
 * LSS Verwaltung – Grundlagen: Einstellungen, Zustand, Zwischenspeicher, Datenladen,
 * Bezirkszuordnung und Auswertung. Alle Module unter src/ teilen sich beim Bauen einen
 * gemeinsamen Gültigkeitsbereich (siehe build-userscript.js).
 */

const Core = LSSFleetCore;
const STANDALONE = new URLSearchParams(location.search).get("lssfo") === "dashboard";

const kit = createKit({
  prefix: "lssfo",
  styles: LSS_STYLES,
  leafletCss: "lssfoLeafletCss",
  requests: { concurrency: 2, gap: 250 },
  onEscape: () => handleEscape(),
  // Liegt eine Spielseite (Lightbox) über dem Panel, gehört Esc dem Spiel.
  ignoreEscape: () => document.documentElement.classList.contains("lssfo-lightbox-front"),
  onNativeBuild: () => state.open && closeDashboard(),
});
const { escapeHtml: esc, formatNumber, formatDecimal, formatDateTime, plural, icon, badge, note, spinner, collator } = kit;

const CACHE = { database: "lssfo-database-v2", store: "cache", data: "lssfo-cache-v2", districts: "lssfo-districts-v1" };
const DATA_TTL = 5 * 60 * 1000;
const CATALOG_TTL = 12 * 60 * 60 * 1000;
const REFRESH_COOLDOWN = 10 * 1000;
const SCAN_FRESH = 10 * 60 * 1000;
const PAGE_SIZE = 200;
const VEHICLE_PAGE_SIZE = 1000;
const CATALOG_URL = "https://api.lss-manager.de/de_DE";
const AUSTRIA_BOX = [9.4, 46.3, 17.3, 49.1];

const settings = kit.store("lssfo-settings-v1", {
  crewMode: "max",
  theme: "auto",
  effects: "auto",
  districtsEnabled: true,
  coverageEnabled: true,
  readinessEnabled: true,
  extensionStatus: "owned",
  extensionLimit: 100,
});
if (!["max", "min"].includes(settings.values.crewMode)) settings.values.crewMode = "max";
if (!["auto", "dark", "light"].includes(settings.values.theme)) settings.values.theme = "auto";
if (!["auto", "full", "reduced"].includes(settings.values.effects)) settings.values.effects = "auto";
kit.setAppearance({ theme: settings.values.theme, effects: settings.values.effects });

const emptyData = () => ({ buildings: [], vehicles: [], schoolings: [], vehicleDistances: [], vehicleTypes: {}, buildingTypes: {}, schoolingTypes: {}, updatedAt: 0, catalogUpdatedAt: 0 });

const state = {
  open: false,
  loading: false,
  error: "",
  tab: "dashboard",
  query: "",
  onlyMissing: false,
  sorts: {},
  limits: {},
  data: emptyData(),
  lastFetch: 0,
  model: null,
  // Prüfergebnisse: je Fahrzeug die zugewiesenen Ausbildungen, je Wache das Personal.
  scans: { vehicles: {}, stations: {} },
  scan: null,
  mapFilter: { vehicleType: "all", buildingType: "all", district: "all", dispatch: "all" },
  edits: {},
  editStatus: {},
  editOptions: {},
  editBuilding: "all",
  editSaving: false,
  refitStarted: {},
  statusSaving: null,
};

let trainingNames = new Map();
let courseDurations = new Map();
const trainingName = (key) => trainingNames.get(key) || Core.humanizeKey(key);
const matches = (search) => !state.query || search.includes(state.query);
const listOf = (value) => (Array.isArray(value) ? value : value?.result || []);
const uniqueSorted = (values) => [...new Set(values.filter(Boolean))].sort(collator.compare);

/* ---------- Zwischenspeicher (IndexedDB, eine Verbindung) ---------- */

let databasePromise = null;

function database() {
  databasePromise ||= new Promise((resolve, reject) => {
    if (!globalThis.indexedDB) {
      reject(new Error("IndexedDB ist nicht verfügbar"));
      return;
    }
    const request = indexedDB.open(CACHE.database, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(CACHE.store)) request.result.createObjectStore(CACHE.store);
    };
    request.onsuccess = () => {
      const db = request.result;
      db.onversionchange = () => {
        db.close();
        databasePromise = null;
      };
      resolve(db);
    };
    request.onerror = () => reject(request.error || new Error("IndexedDB konnte nicht geöffnet werden"));
  }).catch((error) => {
    databasePromise = null;
    throw error;
  });
  return databasePromise;
}

async function cacheRead(key) {
  try {
    const db = await database();
    return await new Promise((resolve, reject) => {
      const request = db.transaction(CACHE.store, "readonly").objectStore(CACHE.store).get(key);
      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => reject(request.error);
    });
  } catch {
    return null;
  }
}

async function cacheWrite(key, value) {
  try {
    const db = await database();
    await new Promise((resolve, reject) => {
      const transaction = db.transaction(CACHE.store, "readwrite");
      transaction.objectStore(CACHE.store).put(value, key);
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error || new Error("abgebrochen"));
    });
  } catch (error) {
    console.warn("LSS Verwaltung: Zwischenspeicher nicht verfügbar.", error);
  }
}

// Änderungen (Umbenennen, Status, Zuweisungen) landen gebündelt im Zwischenspeicher.
let saveTimer = 0;
function saveData() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => void cacheWrite(CACHE.data, { ...state.data }), 400);
}

/* ---------- Daten laden ---------- */

async function fetchAllVehicles() {
  // Große Seiten beantwortet der Server bei vielen Fahrzeugen mit 503; paging.next_page nennt die Folgeseite.
  const vehicles = new Map();
  const seen = new Set();
  let url = `/api/v2/vehicles?limit=${VEHICLE_PAGE_SIZE}`;
  while (url && !seen.has(url)) {
    seen.add(url);
    const page = await kit.getJson(url);
    for (const vehicle of page.result || []) vehicles.set(vehicle.id, vehicle);
    url = page.paging?.next_page || "";
  }
  return [...vehicles.values()];
}

function fetchGameData() {
  return Promise.all([
    kit.getJson("/api/buildings"),
    fetchAllVehicles(),
    kit.getJson("/api/schoolings").catch(() => []),
    kit.getJson("/api/v1/vehicle_distances.json").catch(() => ({ result: [] })),
  ]);
}

const fetchCatalog = () => Promise.all(["vehicles", "buildings", "schoolings"].map((name) => kit.externalJson(`${CATALOG_URL}/${name}`)));

async function loadData(force = false) {
  if (state.loading) return;
  if (force && Date.now() - state.lastFetch < REFRESH_COOLDOWN) {
    kit.toast("Die Daten wurden gerade erst geladen – bitte kurz warten.");
    return;
  }
  state.loading = true;
  state.error = "";
  render();
  try {
    const [cached] = await Promise.all([cacheRead(CACHE.data), loadDistrictCache()]);
    const now = Date.now();
    const useData = !force && cached && now - cached.updatedAt < DATA_TTL;
    const useCatalog = cached && now - (cached.catalogUpdatedAt || 0) < CATALOG_TTL && Object.keys(cached.vehicleTypes || {}).length > 0;
    let catalogFresh = !useCatalog;
    const [game, catalog] = await Promise.all([
      useData ? [cached.buildings, cached.vehicles, cached.schoolings, cached.vehicleDistances] : fetchGameData(),
      useCatalog
        ? [cached.vehicleTypes, cached.buildingTypes, cached.schoolingTypes]
        : fetchCatalog().catch(() => {
          catalogFresh = false;
          return [cached?.vehicleTypes, cached?.buildingTypes, cached?.schoolingTypes];
        }),
    ]);
    state.data = {
      buildings: listOf(game[0]),
      vehicles: listOf(game[1]),
      schoolings: listOf(game[2]),
      vehicleDistances: listOf(game[3]),
      vehicleTypes: catalog[0] || {},
      buildingTypes: catalog[1] || {},
      schoolingTypes: catalog[2] || {},
      updatedAt: useData ? cached.updatedAt : now,
      catalogUpdatedAt: catalogFresh ? now : cached?.catalogUpdatedAt || 0,
    };
    if (!useData) state.lastFetch = now;
    analyze();
    if (!useData || catalogFresh) saveData();
  } catch (error) {
    state.error = `Daten konnten nicht geladen werden: ${error.message}`;
  } finally {
    state.loading = false;
    render();
  }
}

/* ---------- Bezirke ---------- */

// Die Bezirksgrenzen (GeoSphere Austria) haben über 200.000 Punkte. Die Zuordnung je
// Koordinate wird dauerhaft gespeichert, damit die Grenzen nur noch für neue Wachen
// oder die Kartenansicht ausgewertet werden müssen.
const NO_DISTRICT = Object.freeze(["", ""]);
const geo = { data: undefined, display: undefined, boxes: new WeakMap(), assigned: new Map(), loaded: false, dirty: false };
const FEDERAL_STATES = { 1: "Burgenland", 2: "Kärnten", 3: "Niederösterreich", 4: "Oberösterreich", 5: "Salzburg", 6: "Steiermark", 7: "Tirol", 8: "Vorarlberg", 9: "Wien" };

async function loadDistrictCache() {
  if (geo.loaded) return;
  geo.loaded = true;
  const stored = await cacheRead(CACHE.districts);
  for (const [key, value] of stored?.entries || []) geo.assigned.set(key, value);
}

function saveDistrictCache() {
  if (!geo.dirty) return;
  geo.dirty = false;
  void cacheWrite(CACHE.districts, { entries: [...geo.assigned] });
}

const formatDistrictName = (value) => String(value || "").replace(/\s+/g, " ").replace(/,\s*/g, ", ").replace(/([^\s])\(/g, "$1 (").trim();

function districtGeo() {
  if (geo.data !== undefined) return geo.data;
  try {
    const parsed = JSON.parse(kit.gmResource("lssfoAustriaDistricts") || "null");
    if (parsed?.type !== "FeatureCollection" || !Array.isArray(parsed.features)) throw new Error("Ungültige Bezirksdaten");
    const features = parsed.features.map((feature) => ({
      ...feature,
      properties: { ...feature.properties, iso: String(feature.properties?.iso || feature.properties?.g_id || ""), name: formatDistrictName(feature.properties?.name || feature.properties?.g_name) },
    }));
    // Manche Datensätze enthalten Wien zusätzlich als Gesamtfläche neben den 23 Gemeindebezirken.
    const hasViennaDistricts = features.some((feature) => /^9(?:0[1-9]|1\d|2[0-3])$/.test(feature.properties.iso));
    geo.data = { type: "FeatureCollection", features: features.filter((feature) => !(hasViennaDistricts && feature.properties.iso === "900")) };
  } catch {
    geo.data = null;
  }
  return geo.data;
}

// Für die Darstellung genügen ~40 m Genauigkeit; die Zuordnung nutzt die vollen Grenzen.
function districtDisplayGeo() {
  if (geo.display !== undefined) return geo.display;
  const source = districtGeo();
  const simplifyRing = (points) => {
    if (points.length <= 8) return points;
    const result = [points[0]];
    let [lastX, lastY] = points[0];
    for (let index = 1; index < points.length - 1; index += 1) {
      const [x, y] = points[index];
      if (Math.abs(x - lastX) > 0.0004 || Math.abs(y - lastY) > 0.0004) {
        result.push(points[index]);
        lastX = x;
        lastY = y;
      }
    }
    result.push(points[points.length - 1]);
    return result.length >= 4 ? result : points;
  };
  const simplify = (geometry) => {
    if (geometry?.type === "Polygon") return { ...geometry, coordinates: geometry.coordinates.map(simplifyRing) };
    if (geometry?.type === "MultiPolygon") return { ...geometry, coordinates: geometry.coordinates.map((polygon) => polygon.map(simplifyRing)) };
    return geometry;
  };
  geo.display = source ? { ...source, features: source.features.map((feature) => ({ ...feature, geometry: simplify(feature.geometry) })) } : null;
  return geo.display;
}

function polygonsOf(geometry) {
  if (geometry?.type === "Polygon") return [geometry.coordinates];
  if (geometry?.type === "MultiPolygon") return geometry.coordinates;
  return [];
}

function boxOf(feature) {
  let box = geo.boxes.get(feature);
  if (box) return box;
  box = [Infinity, Infinity, -Infinity, -Infinity];
  for (const polygon of polygonsOf(feature.geometry)) {
    for (const [x, y] of polygon[0] || []) {
      if (x < box[0]) box[0] = x;
      if (y < box[1]) box[1] = y;
      if (x > box[2]) box[2] = x;
      if (y > box[3]) box[3] = y;
    }
  }
  geo.boxes.set(feature, box);
  return box;
}

function pointInRing(x, y, ring) {
  let inside = false;
  for (let index = 0, previous = ring.length - 1; index < ring.length; previous = index, index += 1) {
    const [currentX, currentY] = ring[index];
    const [previousX, previousY] = ring[previous];
    if ((currentY > y) !== (previousY > y) && x < ((previousX - currentX) * (y - currentY)) / (previousY - currentY || Number.EPSILON) + currentX) inside = !inside;
  }
  return inside;
}

const containsPoint = (geometry, x, y) => polygonsOf(geometry).some((polygon) => pointInRing(x, y, polygon[0]) && !polygon.slice(1).some((hole) => pointInRing(x, y, hole)));

function federalStateOf(feature) {
  const properties = feature?.properties || {};
  const explicit = properties.state || properties.bundesland || properties.name_1 || properties.land;
  if (explicit) return formatDistrictName(explicit);
  return FEDERAL_STATES[String(properties.iso || properties.gkz || "").replace(/\D/g, "")[0]] || "";
}

// Liefert [Bezirk, Bundesland]. Wachen außerhalb Österreichs werden ohne Auswertung übersprungen.
function districtOf(longitude, latitude) {
  if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) return NO_DISTRICT;
  if (longitude < AUSTRIA_BOX[0] || latitude < AUSTRIA_BOX[1] || longitude > AUSTRIA_BOX[2] || latitude > AUSTRIA_BOX[3]) return NO_DISTRICT;
  const key = `${longitude.toFixed(5)},${latitude.toFixed(5)}`;
  const known = geo.assigned.get(key);
  if (known) return known;
  const data = districtGeo();
  if (!data) return NO_DISTRICT;
  const feature = data.features.find((entry) => {
    const [minX, minY, maxX, maxY] = boxOf(entry);
    return longitude >= minX && longitude <= maxX && latitude >= minY && latitude <= maxY && containsPoint(entry.geometry, longitude, latitude);
  });
  const result = feature ? [feature.properties.name, federalStateOf(feature)] : NO_DISTRICT;
  geo.assigned.set(key, result);
  geo.dirty = true;
  return result;
}

/* ---------- Auswertung ---------- */

// Baut aus den Rohdaten das komplette Modell für alle Bereiche. Läuft nach dem Laden
// und nach jeder Änderung; alle Ansichten lesen danach nur noch daraus.
function analyze() {
  const { buildings, vehicles, vehicleTypes, buildingTypes, schoolingTypes, vehicleDistances, schoolings } = state.data;
  ({ names: trainingNames, durations: courseDurations } = Core.trainingCatalog(schoolingTypes));
  const typeOf = (building) => buildingTypes[String(building.building_type)] || {};

  const buildingInfo = new Map(buildings.map((building) => [Number(building.id), { caption: building.caption, schoolingTypes: typeOf(building).schoolingTypes || [] }]));
  const analyzed = vehicles.map((vehicle) => {
    const entry = Core.analyzeVehicle(vehicle, vehicleTypes[String(vehicle.vehicle_type)], buildingInfo.get(Number(vehicle.building_id)), settings.values.crewMode, state.scans.vehicles[String(vehicle.id)] || null);
    entry.search = `${entry.caption} ${entry.typeCaption} ${entry.buildingCaption}`.toLocaleLowerCase("de");
    entry.hasMissing = entry.missingCrew > 0 || entry.missingTraining > 0;
    return entry;
  });
  const summaries = Core.summarizeBuildings(buildings, analyzed);
  const summaryById = new Map(summaries.map((summary) => [summary.id, summary]));
  const vehiclesByBuilding = Core.groupBy(analyzed, (vehicle) => vehicle.buildingId);
  const referencedDispatch = new Set(buildings.map((building) => Core.normalizedDispatchId(building.leitstelle_building_id)).filter((id) => id !== null));
  const dispatchCaption = new Map(buildings.filter((building) => Core.isDispatchCenter(building, typeOf(building), referencedDispatch)).map((building) => [Number(building.id), building.caption]));

  const all = buildings.map((building) => {
    const id = Number(building.id);
    const type = typeOf(building);
    const latitude = Number(building.latitude);
    const longitude = Number(building.longitude);
    const [district, federalState] = districtOf(longitude, latitude);
    const dispatchCenterId = Core.normalizedDispatchId(building.leitstelle_building_id);
    const typeCaption = type.caption || `Typ ${building.building_type}`;
    return {
      ...building,
      id,
      raw: building,
      typeCaption,
      summary: summaryById.get(id),
      vehicles: vehiclesByBuilding.get(id) || [],
      district,
      federalState,
      dispatchCenterId,
      dispatchCenterCaption: dispatchCenterId ? dispatchCaption.get(dispatchCenterId) || `Leitstelle ${dispatchCenterId}` : "Ohne Leitstelle",
      isDispatchCenter: dispatchCaption.has(id),
      isSchool: Core.isSchool(type, building.caption),
      enabled: building.enabled !== false,
      latitude,
      longitude,
      hasLocation: Number.isFinite(latitude) && Number.isFinite(longitude),
      search: `${building.caption} ${typeCaption} ${district}`.toLocaleLowerCase("de"),
    };
  });
  const buildingById = new Map(all.map((building) => [building.id, building]));
  const stations = all.filter((building) => !building.isDispatchCenter);
  const operational = stations.filter(Core.isOperational);

  // Kontostandard: Typen, die es in irgendeinem eigenen Gebiet gibt.
  const referenceVehicleTypes = new Map();
  const referenceBuildingTypes = new Map();
  for (const building of stations) {
    if (!/schule|akademie|krankenhaus|bereitstellungsraum|verband/i.test(building.typeCaption)) referenceBuildingTypes.set(String(building.building_type), building.typeCaption);
    for (const vehicle of building.vehicles) referenceVehicleTypes.set(String(vehicle.typeId), vehicle.typeCaption);
  }
  const regions = [...Core.groupBy(operational, (building) => (building.dispatchCenterId === null ? "none" : String(building.dispatchCenterId)))].map(([key, members]) => {
    const regionVehicles = members.flatMap((building) => building.vehicles);
    const vehicleTypeIds = new Set(regionVehicles.map((vehicle) => String(vehicle.typeId)));
    const buildingTypeIds = new Set(members.map((building) => String(building.building_type)));
    const total = (valueOf) => members.reduce((sum, building) => sum + Number(valueOf(building) || 0), 0);
    const values = {
      buildings: members.length,
      targetCrew: total((building) => building.summary?.targetCrew),
      missingCrew: total((building) => building.summary?.missingCrew),
      missingTraining: total((building) => building.summary?.missingTraining),
      inactive: members.filter((building) => !building.enabled).length,
    };
    const districts = uniqueSorted(members.map((building) => building.district));
    const federalStates = uniqueSorted(members.map((building) => building.federalState));
    return {
      key,
      caption: members[0].dispatchCenterCaption,
      buildings: members,
      vehicles: regionVehicles,
      personnel: total((building) => building.summary?.personnel),
      ...values,
      readiness: Core.readinessScore(values),
      districts,
      federalStates,
      missingVehicleTypes: [...referenceVehicleTypes].filter(([id]) => !vehicleTypeIds.has(id)).map(([, caption]) => caption),
      missingBuildingTypes: [...referenceBuildingTypes].filter(([id]) => !buildingTypeIds.has(id)).map(([, caption]) => caption),
      search: `${members[0].dispatchCenterCaption} ${districts.join(" ")} ${federalStates.join(" ")}`.toLocaleLowerCase("de"),
    };
  }).sort((a, b) => collator.compare(a.caption, b.caption));

  const extensions = stations.flatMap((building) => Core.extensionRows(building, typeOf(building)));
  for (const entry of extensions) entry.search = `${entry.caption} ${entry.buildingCaption} ${entry.buildingType} ${entry.dispatchCenterCaption} ${entry.district}`.toLocaleLowerCase("de");
  const personnelRows = operational.map((building) => Core.personnelRow(building, state.scans.stations[String(building.id)]));
  for (const row of personnelRows) row.search = `${row.caption} ${row.typeCaption} ${row.dispatchCenterCaption} ${row.district}`.toLocaleLowerCase("de");

  const distanceById = new Map(vehicleDistances.map((entry) => [Number(entry.vehicle_id), entry]));
  const utilization = Core.rateUtilization(analyzed.map((vehicle) => {
    const distance = distanceById.get(vehicle.id) || {};
    const building = buildingById.get(vehicle.buildingId);
    return { ...vehicle, district: building?.district || "", dispatchCenterCaption: building?.dispatchCenterCaption || "Ohne Leitstelle", distanceTotal: Number(distance.distance_km || 0), distance30d: Number(distance.distance_km_30d || 0) };
  }));

  const alerts = [];
  for (const building of operational) {
    const missingCrew = Number(building.summary?.missingCrew || 0);
    const missingTraining = Number(building.summary?.missingTraining || 0);
    if (!building.enabled) alerts.push({ priority: 3, title: building.caption, detail: "Wache ist inaktiv", tab: "buildings" });
    if (missingCrew) alerts.push({ priority: 4, title: building.caption, detail: `${plural(missingCrew, "Person fehlt", "Personen fehlen")} auf Fahrzeugen`, tab: "personnel" });
    if (missingTraining) alerts.push({ priority: 4, title: building.caption, detail: `${plural(missingTraining, "benötigte Ausbildung fehlt", "benötigte Ausbildungen fehlen")}`, tab: "training" });
  }
  const running = extensions.filter((entry) => entry.status === "building").length;
  const inactive = extensions.filter((entry) => entry.status === "inactive").length;
  if (running) alerts.push({ priority: 1, title: "Laufende Ausbauten", detail: `${plural(running, "Ausbau befindet", "Ausbauten befinden")} sich im Bau`, tab: "extensions" });
  if (inactive) alerts.push({ priority: 2, title: "Fertige Ausbauten", detail: `${plural(inactive, "Ausbau ist", "Ausbauten sind")} fertig, aber inaktiv`, tab: "extensions" });
  alerts.sort((a, b) => b.priority - a.priority || collator.compare(a.title, b.title));

  const training = Core.summarizeTraining(analyzed);
  const courses = Core.courseRows(schoolings, new Map(buildings.map((building) => [Number(building.id), building.caption])), courseDurations);

  state.model = {
    vehicles: analyzed,
    vehicleById: new Map(analyzed.map((vehicle) => [vehicle.id, vehicle])),
    buildings: all,
    buildingById,
    stations,
    operational,
    dispatchCenters: all.filter((building) => building.isDispatchCenter),
    regions,
    extensions,
    personnelRows,
    transfers: Core.suggestTransfers(personnelRows, trainingName),
    utilization,
    alerts,
    training,
    courses,
    counts: {
      dashboard: alerts.length,
      vehicles: analyzed.length,
      buildings: all.length,
      regions: regions.length,
      extensions: extensions.filter((entry) => entry.status !== "missing").length,
      utilization: vehicleDistances.length,
      personnel: personnelRows.length,
      training: training.length,
      courses: courses.length,
      map: all.filter((building) => building.hasLocation).length,
    },
  };
  saveDistrictCache();
}

// Rohdatensätze, die beim Bearbeiten direkt angepasst werden (danach analyze()).
const rawVehicle = (id) => state.data.vehicles.find((vehicle) => Number(vehicle.id) === Number(id));
const rawBuilding = (id) => state.data.buildings.find((building) => Number(building.id) === Number(id));

// ---- lss_verwaltung/src/table.js ----
/*
 * Tabellen: Jede Spalte wird einmal beschrieben – Wert (für Sortierung und CSV) und
 * optional die Darstellung. Sortiert wird über alle Zeilen, gezeichnet werden zunächst
 * nur 200; „Weitere anzeigen“ blendet mehr ein.
 *
 *   { label, value: (row) => Zahl|Text|Datum, html?: (row) => HTML, csv?: (row) => Wert | false, sortable?: false }
 */

const MANAGER_TABLE = "manager-personnel";

function displayValue(value) {
  if (value === null || value === undefined || value === "") return '<span class="lssfo-muted">–</span>';
  if (typeof value === "number") return formatNumber(value);
  if (value instanceof Date) return esc(formatDateTime(value));
  return esc(value);
}

function sortRows(key, columns, rows, rank) {
  const sort = state.sorts[key];
  const column = sort ? columns[sort.column] : null;
  if (!column && !rank) return rows;
  const direction = sort?.direction === "desc" ? -1 : 1;
  return rows
    .map((row, index) => ({ row, index, rank: rank ? rank(row) : 0, value: column ? column.value(row) : null }))
    .sort((a, b) => a.rank - b.rank || (column ? direction * Core.compareValues(a.value, b.value, collator) : 0) || a.index - b.index)
    .map((entry) => entry.row);
}

function tableHead(key, columns) {
  const sort = state.sorts[key];
  return columns.map((column, index) => {
    if (column.sortable === false) return `<th>${esc(column.label)}</th>`;
    const direction = sort?.column === index ? sort.direction : "";
    const ariaSort = direction === "asc" ? "ascending" : direction === "desc" ? "descending" : "none";
    return `<th aria-sort="${ariaSort}"><button type="button" class="lssfo-sort${direction ? " is-active" : ""}" data-action="table-sort" data-table="${esc(key)}" data-column="${index}"><span>${esc(column.label)}</span>${icon(direction === "asc" ? "sort-asc" : direction === "desc" ? "sort-desc" : "sort")}</button></th>`;
  }).join("");
}

// Spalten mit hidden: true erscheinen nur im CSV-Export.
const visibleColumns = (columns) => columns.filter((column) => !column.hidden);

function renderTable(key, allColumns, rows, { empty = "Keine passenden Einträge gefunden.", rank, meta = true, className = "", rowAttributes } = {}) {
  if (!rows.length) return `<div class="lssfo-empty">${esc(empty)}</div>`;
  const columns = visibleColumns(allColumns);
  const sorted = sortRows(key, columns, rows, rank);
  const limit = state.limits[key] || PAGE_SIZE;
  const visible = sorted.length > limit ? sorted.slice(0, limit) : sorted;
  const remaining = sorted.length - visible.length;
  const body = visible.map((row) => `<tr${rowAttributes ? rowAttributes(row) : ""}>${columns.map((column) => `<td>${column.html ? column.html(row) : displayValue(column.value(row))}</td>`).join("")}</tr>`).join("");
  const more = remaining > 0
    ? `<div class="lssfo-table-more"><span>${formatNumber(visible.length)} von ${formatNumber(sorted.length)} angezeigt</span><button type="button" class="lssfo-btn" data-action="table-more" data-table="${esc(key)}">Weitere ${formatNumber(Math.min(PAGE_SIZE, remaining))} anzeigen</button><button type="button" class="lssfo-btn" data-action="table-all" data-table="${esc(key)}">Alle anzeigen</button></div>`
    : "";
  const metaLine = meta ? `<div class="lssfo-table-meta">${plural(rows.length, "Eintrag", "Einträge")} · Spaltenüberschrift anklicken zum Sortieren</div>` : "";
  return `${metaLine}<div class="lssfo-table-wrap ${className}"><table class="lssfo-table"><thead><tr>${tableHead(key, columns)}</tr></thead><tbody>${body}</tbody></table></div>${more}`;
}

const rerenderTable = (key) => (key === MANAGER_TABLE ? renderManager() : renderContent());

function changeSort(key, column) {
  const current = state.sorts[key];
  state.sorts[key] = { column, direction: current?.column === column && current.direction === "asc" ? "desc" : "asc" };
  rerenderTable(key);
}

// CSV der aktuellen Ansicht: dieselben Spalten und Zeilen wie angezeigt (Suche, Filter,
// Sortierung), aber alle Einträge statt nur der gezeichneten.
function exportCsv() {
  const table = currentView().table?.();
  if (!table?.rows.length) {
    kit.toast("In dieser Ansicht gibt es nichts zu exportieren.");
    return;
  }
  const columns = table.columns.filter((column) => column.csv !== false);
  const rows = sortRows(table.key, visibleColumns(table.columns), table.rows).map((row) => columns.map((column) => (column.csv ? column.csv(row) : column.value(row))));
  const csv = Core.toCsv(columns.map((column) => column.label), rows);
  const url = URL.createObjectURL(new Blob(["﻿", csv], { type: "text/csv;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `lss-${state.tab}-${new Date().toISOString().slice(0, 10)}.csv`;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

kit.on({
  click: {
    "table-sort": (element) => changeSort(element.dataset.table, Number(element.dataset.column)),
    "table-more": (element) => {
      state.limits[element.dataset.table] = (state.limits[element.dataset.table] || PAGE_SIZE) + PAGE_SIZE;
      rerenderTable(element.dataset.table);
    },
    "table-all": (element) => {
      state.limits[element.dataset.table] = Infinity;
      rerenderTable(element.dataset.table);
    },
  },
});

// ---- lss_verwaltung/src/views.js ----
/*
 * Bereiche der Übersicht. Jeder Bereich liefert seine Tabelle ({ key, columns, rows }) –
 * dieselbe Beschreibung dient der Anzeige, der Sortierung und dem CSV-Export.
 */

const VIEWS = [
  { id: "dashboard", label: "Übersicht", icon: "dashboard", render: renderDashboard, table: dashboardTable },
  { id: "vehicles", label: "Fahrzeuge", icon: "vehicle", render: tableView(vehiclesTable), table: vehiclesTable },
  { id: "edit", label: "Bearbeiten", icon: "edit", render: renderEditor, table: editorTable, count: () => Object.keys(state.edits).length },
  { id: "buildings", label: "Wachen", icon: "building", render: tableView(buildingsTable), table: buildingsTable },
  { id: "regions", label: "Gebiete", icon: "region", render: renderRegions, table: regionsTable },
  { id: "extensions", label: "Ausbauten", icon: "extension", render: renderExtensions, table: extensionsTable },
  { id: "utilization", label: "Auslastung", icon: "gauge", render: renderUtilization, table: utilizationTable },
  { id: "personnel", label: "Personalplanung", icon: "users", render: renderPersonnel, table: personnelTable },
  { id: "training", label: "Ausbildungen", icon: "training", render: renderTraining, table: trainingTable },
  { id: "courses", label: "Lehrgänge", icon: "calendar", render: renderCourses, table: coursesTable },
  { id: "map", label: "Karte", icon: "map", render: renderMap, table: mapTable },
];

const currentView = () => VIEWS.find((view) => view.id === state.tab) || VIEWS[0];
const gameLink = (href, text, title = "") => `<a href="${href}" target="_blank" rel="noopener"${title ? ` title="${esc(title)}"` : ""}>${esc(text)}</a>`;
const countBadge = (value, tone = "danger") => (value ? badge(formatNumber(value), tone) : badge("0", "ok"));
const callout = (title, text) => `<div class="lssfo-callout">${title ? `<strong>${esc(title)}</strong>` : ""}<span>${text}</span></div>`;
const panelIntro = (title, text, actions = "") => `<div class="lssfo-intro"><div><strong>${esc(title)}</strong><span>${text}</span></div>${actions ? `<div class="lssfo-intro-actions">${actions}</div>` : ""}</div>`;

function tableView(source) {
  return (content) => {
    const { key, columns, rows } = source();
    content.innerHTML = renderTable(key, columns, rows);
  };
}

/* ---------- Übersicht ---------- */

function dashboardTable() {
  return {
    key: "dashboard",
    rows: state.model.alerts,
    columns: [
      { label: "Priorität", value: (row) => row.priority },
      { label: "Bereich", value: (row) => row.title },
      { label: "Hinweis", value: (row) => row.detail },
    ],
  };
}

function renderDashboard(content) {
  const model = state.model;
  const readiness = Math.round(model.regions.reduce((sum, region) => sum + region.readiness, 0) / Math.max(1, model.regions.length));
  const running = model.extensions.filter((entry) => entry.status === "building").length;
  const inactive = model.extensions.filter((entry) => entry.status === "inactive").length;
  const cards = [
    ["Einsatzbereitschaft", `${readiness} %`, plural(model.regions.length, "Gebiet", "Gebiete"), "regions", "region", "#007aff"],
    ["Ohne Leitstelle", formatNumber(model.operational.filter((building) => building.dispatchCenterId === null).length), "Wachen", "regions", "building", "#ff9500"],
    ["Personalengpässe", formatNumber(model.personnelRows.filter((row) => row.shortage > 0 || row.assignmentGap > 0).length), "Wachen", "personnel", "users", "#af52de"],
    ["Ausbauten", `${formatNumber(running)} / ${formatNumber(inactive)}`, "im Bau / inaktiv", "extensions", "extension", "#34c759"],
    ["Wenig ausgelastet", formatNumber(model.utilization.filter((vehicle) => vehicle.utilization === "low").length), "Fahrzeuge", "utilization", "gauge", "#30b0c7"],
    ["Lehrgänge", formatNumber(model.courses.length), "laufend", "courses", "calendar", "#ff2d55"],
  ].map(([label, value, hint, tab, iconName, color]) => `<button type="button" class="lssfo-dash-card" data-action="tab" data-tab="${tab}"><i style="--tone:${color}">${icon(iconName)}</i><span>${esc(label)}</span><strong>${esc(value)}</strong><small>${esc(hint)}</small></button>`).join("");
  const alerts = model.alerts.slice(0, 10).map((alert) => `<button type="button" class="lssfo-row-button priority-${alert.priority}" data-action="tab" data-tab="${alert.tab}"><span><strong>${esc(alert.title)}</strong><small>${esc(alert.detail)}</small></span>${icon("chevron")}</button>`).join("")
    || '<div class="lssfo-empty is-small">Keine kritischen Hinweise.</div>';
  const regions = model.regions.slice().sort((a, b) => a.readiness - b.readiness).slice(0, 5)
    .map((region) => `<button type="button" class="lssfo-row-button" data-action="tab" data-tab="regions"><span><strong>${esc(region.caption)}</strong><small>${plural(region.buildings.length, "Wache", "Wachen")} · ${plural(region.missingCrew, "Person fehlt", "Personen fehlen")}</small></span><b class="lssfo-score is-${Core.readinessTone(region.readiness)}">${region.readiness} %</b></button>`).join("")
    || '<div class="lssfo-empty is-small">Keine Gebiete erkannt.</div>';
  content.innerHTML = `<div class="lssfo-dash-grid">${cards}</div>
    <div class="lssfo-dash-columns">
      <section class="lssfo-panel-card"><div class="lssfo-heading"><div><h3>Handlungsbedarf</h3><p>Die wichtigsten offenen Punkte aus allen Bereichen</p></div></div>${alerts}</section>
      <section class="lssfo-panel-card"><div class="lssfo-heading"><div><h3>Kritischste Gebiete</h3><p>Bereitschaft aus Personal, Ausbildung und Aktivstatus</p></div></div>${regions}</section>
    </div>`;
}

/* ---------- Fahrzeuge ---------- */

function trainingSummary(vehicle) {
  return vehicle.training.map((item) => `${trainingName(item.key)}: ${item.required}${item.actual === null ? "" : ` / ${item.actual}`}`);
}

function vehiclesTable() {
  return {
    key: "vehicles",
    rows: state.model.vehicles.filter((vehicle) => (!state.onlyMissing || vehicle.hasMissing) && matches(vehicle.search)),
    columns: [
      { label: "Fahrzeug", value: (row) => row.caption, html: (row) => gameLink(`/vehicles/${row.id}/zuweisung`, row.caption) },
      { label: "Typ", value: (row) => row.typeCaption },
      { label: "Wache", value: (row) => row.buildingCaption, html: (row) => gameLink(`/buildings/${row.buildingId}`, row.buildingCaption) },
      { label: "Soll", value: (row) => row.target, html: (row) => `${row.target} <small class="lssfo-muted">(${row.staffMin}–${row.staffMax})</small>` },
      { label: "Zugewiesen", value: (row) => row.assigned },
      { label: "Fehlt", value: (row) => row.missingCrew, html: (row) => countBadge(row.missingCrew) },
      {
        label: "Ausbildung",
        value: (row) => row.missingTraining,
        csv: (row) => trainingSummary(row).join(", "),
        html: (row) => {
          const lines = row.training.length ? trainingSummary(row).map(esc).join("<br>") : '<span class="lssfo-muted">keine</span>';
          const mark = row.missingTraining ? badge(`${row.missingTraining} fehlt`, "danger") : row.training.length && row.educationScanned ? badge("geprüft", "ok") : "";
          return `<span class="lssfo-training-cell">${lines}${mark}</span>`;
        },
      },
      { label: "Ausbildung fehlt", value: (row) => row.missingTraining, hidden: true },
      { label: "Verwaltung", value: () => null, sortable: false, csv: false, html: (row) => `<button type="button" class="lssfo-btn is-small" data-action="manage-vehicle" data-id="${row.id}">Bearbeiten</button>` },
    ],
  };
}

/* ---------- Wachen ---------- */

function statusCell(building) {
  const saving = state.statusSaving === building.id;
  return `<span class="lssfo-inline">${building.enabled ? badge("aktiv", "ok") : badge("inaktiv", "warn")}<button type="button" class="lssfo-btn is-small" data-action="building-status" data-id="${building.id}"${state.statusSaving !== null ? " disabled" : ""}>${saving ? "Bitte warten …" : building.enabled ? "Deaktivieren" : "Aktivieren"}</button></span>`;
}

function buildingsTable() {
  const notApplicable = '<span class="lssfo-muted">–</span>';
  const operational = (building, valueOf) => (building.isDispatchCenter ? null : valueOf(building));
  return {
    key: "buildings",
    rows: state.model.buildings.filter((building) => {
      const missing = !building.isDispatchCenter && (building.summary.missingCrew > 0 || building.summary.missingTraining > 0);
      return (!state.onlyMissing || missing) && matches(building.search);
    }),
    columns: [
      { label: "Wache", value: (row) => row.caption, html: (row) => gameLink(`/buildings/${row.id}`, row.caption) },
      { label: "Typ", value: (row) => row.typeCaption, html: (row) => `${esc(row.typeCaption)}${row.isDispatchCenter ? ` ${badge("Verwaltung")}` : ""}` },
      { label: "Fahrzeuge", value: (row) => operational(row, (building) => building.summary.vehicles) },
      { label: "Personal", value: (row) => operational(row, (building) => building.summary.personnel), html: (row) => (row.isDispatchCenter ? notApplicable : `${formatNumber(row.summary.personnel)}${row.summary.personnelTarget ? ` <small class="lssfo-muted">Soll ${formatNumber(row.summary.personnelTarget)}</small>` : ""}`) },
      { label: "Zugewiesen", value: (row) => operational(row, (building) => building.summary.assigned), html: (row) => (row.isDispatchCenter ? notApplicable : `${formatNumber(row.summary.assigned)} / ${formatNumber(row.summary.targetCrew)}`) },
      { label: "Frei", value: (row) => operational(row, (building) => building.summary.free) },
      { label: "Besatzung fehlt", value: (row) => operational(row, (building) => building.summary.missingCrew), html: (row) => (row.isDispatchCenter ? badge("nicht relevant") : countBadge(row.summary.missingCrew)) },
      { label: "Status", value: (row) => (row.enabled ? "aktiv" : "inaktiv"), html: statusCell },
      { label: "Verwaltung", value: () => null, sortable: false, csv: false, html: (row) => `<button type="button" class="lssfo-btn is-small" data-action="manage-building" data-id="${row.id}">Bearbeiten</button>` },
    ],
  };
}

/* ---------- Gebiete ---------- */

function missingList(label, values) {
  if (!values.length) return `<span class="lssfo-complete">${label}: vollständig</span>`;
  return `<span><b>${label}:</b> ${esc(values.slice(0, 5).join(", "))}${values.length > 5 ? ` +${values.length - 5}` : ""}</span>`;
}

function regionsTable() {
  return {
    key: "regions",
    rows: state.model.regions.filter((region) => (!state.onlyMissing || region.readiness < 90) && matches(region.search)),
    columns: [
      { label: "Leitstelle / Gebiet", value: (row) => row.caption, html: (row) => (row.key === "none" ? badge("ohne Zuordnung", "danger") : gameLink(`/buildings/${row.key}`, row.caption)) },
      { label: "Bundesland", value: (row) => row.federalStates.join(", ") },
      { label: "Bezirke", value: (row) => row.districts.join(", ") },
      { label: "Wachen", value: (row) => row.buildings.length },
      { label: "Fahrzeuge", value: (row) => row.vehicles.length },
      { label: "Personal", value: (row) => row.personnel, html: (row) => `${formatNumber(row.personnel)} / ${formatNumber(row.targetCrew)}` },
      { label: "Sollpersonal", value: (row) => row.targetCrew, hidden: true },
      { label: "Fehlbedarf", value: (row) => row.missingCrew, html: (row) => `${row.missingCrew ? badge(`${formatNumber(row.missingCrew)} Pers.`, "danger") : badge("0 Pers.", "ok")}${row.missingTraining ? badge(`${formatNumber(row.missingTraining)} Ausb.`, "warn") : ""}` },
      { label: "Ausbildung fehlt", value: (row) => row.missingTraining, hidden: true },
      { label: "Bereitschaft", value: (row) => row.readiness, html: (row) => `<b class="lssfo-score is-${Core.readinessTone(row.readiness)}">${row.readiness} %</b>` },
      {
        label: "Lücken",
        value: (row) => row.missingVehicleTypes.length + row.missingBuildingTypes.length,
        csv: (row) => [`Fahrzeuge: ${row.missingVehicleTypes.join(", ") || "vollständig"}`, `Wachen: ${row.missingBuildingTypes.join(", ") || "vollständig"}`].join(" | "),
        html: (row) => `<small class="lssfo-gaps">${missingList("Fahrzeuge", row.missingVehicleTypes)}${missingList("Wachen", row.missingBuildingTypes)}</small>`,
      },
    ],
  };
}

function renderRegions(content) {
  const { key, columns, rows } = regionsTable();
  content.innerHTML = callout("Kontostandard", "Fehlende Wachen- und Fahrzeugtypen werden mit den Typen verglichen, die es in deinen übrigen Leitstellengebieten bereits gibt.")
    + renderTable(key, columns, rows);
}

/* ---------- Ausbauten ---------- */

const EXTENSION_STATUS = {
  owned: { label: "Vorhanden", test: (entry) => entry.status !== "missing" },
  attention: { label: "Handlungsbedarf", test: (entry) => entry.status === "building" || entry.status === "inactive" },
  active: { label: "Aktiv", test: (entry) => entry.status === "active" },
  building: { label: "Im Bau", test: (entry) => entry.status === "building" },
  inactive: { label: "Fertig, inaktiv", test: (entry) => entry.status === "inactive" },
  missing: { label: "Katalog: noch möglich", test: (entry) => entry.status === "missing" },
  all: { label: "Alle Status", test: () => true },
};
const EXTENSION_LABELS = { active: "aktiv", building: "im Bau", inactive: "fertig, inaktiv", missing: "fehlt" };

function extensionStatusHtml(entry) {
  if (entry.status === "building") return `${badge("im Bau", "warn")} <small>${esc(Core.relativeTime(entry.availableAt))}</small>`;
  if (entry.status === "inactive") return badge("fertig, inaktiv", "danger");
  if (entry.status === "missing") return badge("fehlt", "warn");
  return badge("aktiv", "ok");
}

function extensionsTable() {
  const filter = EXTENSION_STATUS[settings.values.extensionStatus] || EXTENSION_STATUS.owned;
  return {
    key: "extensions",
    rows: state.model.extensions.filter((entry) => filter.test(entry) && (!state.onlyMissing || entry.status !== "active") && matches(entry.search)),
    columns: [
      { label: "Wache", value: (row) => row.buildingCaption, html: (row) => gameLink(`/buildings/${row.buildingId}`, row.buildingCaption) },
      { label: "Typ", value: (row) => row.buildingType },
      { label: "Leitstelle", value: (row) => row.dispatchCenterCaption },
      { label: "Bezirk", value: (row) => row.district },
      { label: "Ausbau", value: (row) => row.caption },
      { label: "Status / Restzeit", value: (row) => EXTENSION_LABELS[row.status], html: extensionStatusHtml },
      { label: "Verfügbar ab", value: (row) => row.availableAt, hidden: true },
    ],
  };
}

function renderExtensions(content) {
  const { key, columns, rows } = extensionsTable();
  const limit = settings.values.extensionLimit === "all" ? Infinity : Number(settings.values.extensionLimit) || 100;
  const shown = rows.length > limit ? rows.slice(0, limit) : rows;
  const statusOptions = Object.entries(EXTENSION_STATUS).map(([value, entry]) => ({ value, label: entry.label }));
  const limitOptions = ["50", "100", "250", "500"].map((value) => ({ value, label: value })).concat({ value: "all", label: "Alle" });
  const controls = `<label class="lssfo-field"><span>Status</span>${kit.selectHtml('data-change="extension-status"', statusOptions, settings.values.extensionStatus)}</label>
    <label class="lssfo-field"><span>Maximal anzeigen</span>${kit.selectHtml('data-change="extension-limit"', limitOptions, String(settings.values.extensionLimit))}</label>`;
  content.innerHTML = panelIntro("Ausbauverwaltung", "Standardmäßig werden nur vorhandene Ausbauten gezeigt. Mögliche Ausbauten laut Katalog lassen sich zuschalten.", controls)
    + (shown.length < rows.length ? callout(`${formatNumber(shown.length)} von ${formatNumber(rows.length)}`, "Einträgen werden angezeigt. Grenze oben erhöhen oder Suche und Statusfilter verwenden.") : "")
    + renderTable(key, columns, shown);
}

/* ---------- Auslastung ---------- */

const UTILIZATION = {
  low: { label: "niedrig", tone: "warn", advice: "Standort oder Vorhaltung prüfen" },
  high: { label: "hoch", tone: "danger", advice: "Entlastungsfahrzeug prüfen" },
  normal: { label: "normal", tone: "ok", advice: "passende Auslastung" },
  unknown: { label: "keine Daten", tone: "neutral", advice: "–" },
};

function utilizationTable() {
  const decimal = (valueOf) => (row) => formatDecimal(valueOf(row));
  return {
    key: "utilization",
    rows: state.model.utilization.filter((vehicle) => (!state.onlyMissing || vehicle.utilization === "low" || vehicle.utilization === "high") && matches(vehicle.search)),
    columns: [
      { label: "Fahrzeug", value: (row) => row.caption, html: (row) => gameLink(`/vehicles/${row.id}`, row.caption) },
      { label: "Typ", value: (row) => row.typeCaption },
      { label: "Wache", value: (row) => row.buildingCaption },
      { label: "Bezirk", value: (row) => row.district },
      { label: "Gesamt-km", value: (row) => row.distanceTotal, html: decimal((row) => row.distanceTotal) },
      { label: "30 Tage", value: (row) => row.distance30d, html: decimal((row) => row.distance30d) },
      { label: "Typdurchschnitt", value: (row) => Math.round(row.typeAverage30d * 10) / 10, html: decimal((row) => row.typeAverage30d) },
      { label: "Bewertung", value: (row) => UTILIZATION[row.utilization].label, html: (row) => badge(UTILIZATION[row.utilization].label, UTILIZATION[row.utilization].tone) },
      { label: "Empfehlung", value: (row) => UTILIZATION[row.utilization].advice },
    ],
  };
}

function renderUtilization(content) {
  const { key, columns, rows } = utilizationTable();
  const all = state.model.utilization;
  const hasData = state.data.vehicleDistances.length > 0;
  const summary = [
    ["Stärkste Wache", Core.topGroup(all, (vehicle) => vehicle.buildingCaption)],
    ["Stärkster Fahrzeugtyp", Core.topGroup(all, (vehicle) => vehicle.typeCaption)],
    ["Stärkster Bezirk", Core.topGroup(all, (vehicle) => vehicle.district || "Ohne Bezirk")],
  ].map(([label, group]) => `<article class="lssfo-stat"><span>${label}</span><strong>${esc(group.caption)}</strong><small>${formatDecimal(group.distance)} km / 30 Tage</small></article>`).join("");
  content.innerHTML = callout(hasData ? "30-Tage-Auswertung" : "Keine Kilometerdaten", hasData
    ? "Niedrig und hoch werden relativ zum Durchschnitt desselben Fahrzeugtyps bewertet; bei Einzelstücken dient der Gesamtdurchschnitt als Bezug."
    : "Der offizielle Endpunkt /api/v1/vehicle_distances.json hat keine Werte geliefert.")
    + `<div class="lssfo-stats">${summary}</div>`
    + renderTable(key, columns, rows);
}

/* ---------- Personalplanung ---------- */

function qualificationHtml(row) {
  if (!row.personnelScan) return row.trainingGap ? badge(`${formatNumber(row.trainingGap)} fehlt`, "warn") : '<span class="lssfo-muted">Detailprüfung offen</span>';
  if (!row.qualificationBalance.length) return badge("keine Anforderungen");
  return row.qualificationBalance.map((entry) => {
    const tone = entry.difference < 0 ? "danger" : entry.difference > 0 ? "warn" : "ok";
    const suffix = entry.difference < 0 ? `${-entry.difference} fehlt` : entry.difference > 0 ? `${entry.difference} Reserve` : "passend";
    return badge(`${trainingName(entry.key)}: ${entry.available}/${entry.required} · ${suffix}`, tone, entry.names.join(", "));
  }).join(" ");
}

function personnelTable() {
  return {
    key: "personnel",
    rows: state.model.personnelRows.filter((row) => (!state.onlyMissing || row.shortage || row.assignmentGap || row.trainingGap) && matches(row.search)),
    columns: [
      { label: "Wache", value: (row) => row.caption, html: (row) => gameLink(`/buildings/${row.id}`, row.caption) },
      { label: "Typ", value: (row) => row.typeCaption },
      { label: "Leitstelle", value: (row) => row.dispatchCenterCaption },
      { label: "Personal", value: (row) => row.personnel, html: (row) => gameLink(`/buildings/${row.id}/personals`, formatNumber(row.personnel), "Personal der Wache öffnen") },
      { label: "Fahrzeug-Soll", value: (row) => row.targetCrew },
      { label: "Nicht zugewiesen", value: (row) => row.unassigned },
      { label: "Reserve", value: (row) => row.reserve, html: (row) => (row.reserve ? badge(formatNumber(row.reserve), "ok") : "0") },
      { label: "Personal fehlt", value: (row) => row.shortage, html: (row) => countBadge(row.shortage) },
      { label: "Zuweisung fehlt", value: (row) => row.assignmentGap, html: (row) => countBadge(row.assignmentGap) },
      { label: "Ausbildungsbilanz", value: (row) => row.trainingGap, html: qualificationHtml },
    ],
  };
}

function transferCard(suggestion) {
  const people = (count) => plural(count, "Person", "Personen");
  const title = suggestion.kind === "assign"
    ? `${plural(suggestion.amount, "freie Person", "freie Personen")} Fahrzeugen zuweisen`
    : suggestion.kind === "qualification" ? `${suggestion.amount}× ${suggestion.qualification} verschieben` : `${people(suggestion.amount)} verschieben`;
  const detail = suggestion.kind === "assign"
    ? `${suggestion.to.caption} · Personal ist bereits an der Wache vorhanden`
    : `${suggestion.from.caption} → ${suggestion.to.caption} · ${suggestion.sameDispatch ? "gleiche Leitstelle" : "leitstellenübergreifend"}`;
  return `<article class="lssfo-transfer"><i>${icon("transfer")}</i><div><strong>${esc(title)}</strong><small>${esc(detail)}</small></div><a class="lssfo-btn is-small" href="/buildings/${suggestion.to.id}/personals" target="_blank" rel="noopener">Personal</a></article>`;
}

function renderPersonnel(content) {
  const { key, columns, rows } = personnelTable();
  const scanned = Object.keys(state.scans.stations).length;
  const running = state.scan?.kind === "personnel";
  const button = `<button type="button" class="lssfo-btn" data-action="scan-personnel"${state.scan && !running ? " disabled" : ""}>${running ? `${icon("stop")} Prüfung stoppen` : `${icon("scan")} Personal detailliert prüfen`}</button>`;
  const suggestions = state.model.transfers.slice(0, 12).map(transferCard).join("") || '<div class="lssfo-empty is-small">Aus den aktuellen Sollwerten lässt sich keine sinnvolle Verschiebung ableiten.</div>';
  content.innerHTML = `<section class="lssfo-panel-card lssfo-transfers">
      <div class="lssfo-heading"><div><h3>Verschiebevorschläge</h3><p>Reserve wird zuerst innerhalb derselben Leitstelle verteilt; nach der Detailprüfung zählen auch Ausbildungsüberschüsse.</p></div>${button}</div>
      ${scanned ? note("success", `${plural(scanned, "Wache", "Wachen")} mit Namen, Verfügbarkeit und Ausbildungen geprüft.`) : ""}
      ${suggestions}
    </section>${renderTable(key, columns, rows)}`;
}

/* ---------- Ausbildungen ---------- */

function trainingTable() {
  return {
    key: "training",
    rows: state.model.training.filter((item) => (!state.onlyMissing || (item.scannedVehicles && item.missing > 0)) && matches(`${item.school} ${item.key} ${trainingName(item.key)}`.toLocaleLowerCase("de"))),
    columns: [
      { label: "Ausbildung", value: (row) => trainingName(row.key) },
      { label: "Bereich", value: (row) => row.school },
      { label: "Fahrzeuge", value: (row) => row.vehicles },
      { label: "Benötigte Plätze", value: (row) => row.required },
      { label: "Vorhanden", value: (row) => (row.scannedVehicles ? row.actual : null) },
      { label: "Fehlt", value: (row) => (row.scannedVehicles ? row.missing : null), html: (row) => (row.scannedVehicles ? countBadge(row.missing) : '<span class="lssfo-muted">–</span>') },
      { label: "Prüfstand", value: (row) => row.scannedVehicles, html: (row) => `${formatNumber(row.scannedVehicles)} / ${formatNumber(row.vehicles)}`, csv: (row) => `${row.scannedVehicles} / ${row.vehicles}` },
    ],
  };
}

function renderTraining(content) {
  const { key, columns, rows } = trainingTable();
  const scanned = Object.keys(state.scans.vehicles).length > 0;
  content.innerHTML = callout(scanned ? "Ausbildungsprüfung aktiv" : "Ausbildungsbedarf berechnet", scanned
    ? "„Vorhanden“ zählt passend ausgebildete Personen, die dem jeweiligen Fahrzeug zugewiesen sind."
    : "„Ausbildungen prüfen“ liest die tatsächlichen Fahrzeugzuweisungen – eine Abfrage je Wache, schonend nacheinander.")
    + renderTable(key, columns, rows);
}

/* ---------- Lehrgänge ---------- */

function coursesTable() {
  return {
    key: "courses",
    rows: state.model.courses.filter((course) => matches(`${course.title} ${course.school}`.toLocaleLowerCase("de"))),
    columns: [
      { label: "Lehrgang", value: (row) => row.title },
      { label: "Schule", value: (row) => row.school },
      { label: "Status", value: (row) => (row.running ? "Läuft" : "Offen"), html: (row) => (row.running ? badge("Läuft", "ok") : badge("Offen", "warn")) },
      { label: "Beginn", value: (row) => row.start },
      { label: "Ende", value: (row) => row.finish },
      { label: "Restzeit", value: (row) => row.finish, html: (row) => (row.finish ? esc(Core.relativeTime(row.finish)) : '<span class="lssfo-muted">–</span>'), csv: (row) => (row.finish ? Core.relativeTime(row.finish) : "") },
      { label: "Freie Plätze", value: (row) => row.openSpaces },
    ],
  };
}

function renderCourses(content) {
  const { key, columns, rows } = coursesTable();
  const intro = panelIntro("Lehrgangsverwaltung", "Eigene Schule auswählen und die Spieloberfläche direkt im Panel verwenden.", `<button type="button" class="lssfo-btn is-primary" data-action="course-open">${icon("plus")}<span>Lehrgang starten</span></button>`);
  content.innerHTML = intro + renderTable(key, columns, rows, { empty: "Keine laufenden eigenen Lehrgänge gefunden." });
}

kit.on({
  change: {
    "extension-status": (element) => {
      settings.set({ extensionStatus: element.value });
      renderContent();
    },
    "extension-limit": (element) => {
      settings.set({ extensionLimit: element.value === "all" ? "all" : Math.max(25, Number(element.value) || 100) });
      renderContent();
    },
  },
});

// ---- lss_verwaltung/src/map.js ----
/*
 * Karte aller Wachen. Die Leaflet-Karte bleibt beim Filtern, Suchen und bei
 * Statusänderungen bestehen; Marker, Bezirke und Leitstellengebiete werden nur
 * abgeglichen. Gezeichnet wird auf Canvas (die Bezirksgrenzen sind sehr detailliert).
 */

const overview = { map: null, container: null, markers: new Map(), markerLayer: null, districts: null, coverage: null, signature: "" };

function vehiclesForFilter(building) {
  const type = state.mapFilter.vehicleType;
  return type === "all" ? building.vehicles : building.vehicles.filter((vehicle) => String(vehicle.typeId) === type);
}

function mapLocations() {
  const filter = state.mapFilter;
  return state.model.buildings.filter((building) => {
    if (!building.hasLocation) return false;
    if (filter.vehicleType !== "all" && !building.vehicles.some((vehicle) => String(vehicle.typeId) === filter.vehicleType)) return false;
    if (filter.buildingType !== "all" && String(building.building_type) !== filter.buildingType) return false;
    if (filter.district !== "all" && building.district !== filter.district) return false;
    if (filter.dispatch !== "all" && (filter.dispatch === "none" ? building.dispatchCenterId !== null : String(building.dispatchCenterId) !== filter.dispatch)) return false;
    const missing = (building.summary?.missingCrew || 0) > 0 || (building.summary?.missingTraining || 0) > 0;
    if (state.onlyMissing && !missing) return false;
    return matches(building.search) || building.vehicles.some((vehicle) => matches(vehicle.search));
  }).sort((a, b) => collator.compare(a.caption, b.caption));
}

function mapTable() {
  return {
    key: "map",
    rows: mapLocations(),
    columns: [
      { label: "Wache", value: (row) => row.caption },
      { label: "Typ", value: (row) => row.typeCaption },
      { label: "Bezirk", value: (row) => row.district },
      { label: "Leitstelle", value: (row) => row.dispatchCenterCaption },
      { label: "Status", value: (row) => (row.enabled ? "aktiv" : "inaktiv") },
      { label: "Fahrzeuge", value: (row) => vehiclesForFilter(row).length },
      { label: "Besatzung fehlt", value: (row) => row.summary?.missingCrew || 0 },
      { label: "Breite", value: (row) => row.latitude },
      { label: "Länge", value: (row) => row.longitude },
    ],
  };
}

function mapFilterHtml() {
  const model = state.model;
  const filter = state.mapFilter;
  const districtData = settings.values.districtsEnabled ? districtGeo() : null;
  const options = (pairs) => pairs.sort((a, b) => collator.compare(a.label, b.label));
  const vehicleTypes = options([...new Map(model.vehicles.map((vehicle) => [String(vehicle.typeId), vehicle.typeCaption]))].map(([value, label]) => ({ value, label })));
  const buildingTypes = options([...new Map(model.buildings.map((building) => [String(building.building_type), building.typeCaption]))].map(([value, label]) => ({ value, label })));
  const districts = uniqueSorted(model.buildings.map((building) => building.district)).map((name) => ({ value: name, label: name }));
  const dispatch = options(model.dispatchCenters.map((building) => ({ value: String(building.id), label: building.caption })));
  const active = Object.values(filter).some((value) => value !== "all");
  const select = (key, all, list, disabled = false) => kit.selectHtml(`data-change="map-filter" data-filter="${key}"${disabled ? " disabled" : ""}`, [{ value: "all", label: all }, ...list], filter[key]);
  const toggle = (change, label, checked, disabled = false) => `<label class="lssfo-toggle"><input class="lssfo-switch" type="checkbox" data-change="${change}"${checked ? " checked" : ""}${disabled ? " disabled" : ""}><span>${label}</span></label>`;
  return `<label class="lssfo-field"><span>Fahrzeugtyp</span>${select("vehicleType", "Alle Fahrzeugtypen", vehicleTypes)}</label>
    <label class="lssfo-field"><span>Wachenart</span>${select("buildingType", "Alle Wachenarten", buildingTypes)}</label>
    <label class="lssfo-field"><span>Leitstelle</span>${select("dispatch", "Alle Leitstellen", [{ value: "none", label: "Ohne Leitstelle" }, ...dispatch])}</label>
    <label class="lssfo-field"><span>Bezirk</span>${select("district", "Alle Bezirke", districts, !districts.length)}</label>
    ${toggle("map-districts", "Bezirksgrenzen", settings.values.districtsEnabled)}
    ${toggle("map-readiness", "Bereitschaft", settings.values.readinessEnabled, !districtData)}
    ${toggle("map-coverage", "Leitstellengebiete", settings.values.coverageEnabled)}
    <button type="button" class="lssfo-btn" data-action="map-filter-reset"${active ? "" : " disabled"}>Filter zurücksetzen</button>
    <span class="lssfo-map-source">${settings.values.districtsEnabled ? (districtData ? "Bezirke: Statistik Austria / GeoSphere Austria (CC BY 4.0)" : "Bezirksdaten konnten nicht geladen werden") : "Bezirksgrenzen ausgeblendet"}</span>`;
}

function mapListHtml(locations) {
  const allTypes = state.mapFilter.vehicleType === "all";
  const items = locations.map((building) => {
    const count = vehiclesForFilter(building).length;
    const subline = [building.typeCaption, building.district ? `Bezirk ${building.district}` : "", building.dispatchCenterCaption, building.enabled ? "aktiv" : "inaktiv"].filter(Boolean).join(" · ");
    return `<button type="button" class="lssfo-map-item${building.enabled ? "" : " is-inactive"}" data-action="map-focus" data-id="${building.id}"><span><strong>${esc(building.caption)}</strong><small>${esc(subline)}</small></span><b>${formatNumber(count)} ${allTypes ? "Fz." : "Treffer"}</b></button>`;
  }).join("");
  return `<div class="lssfo-map-list-head"><strong>${plural(locations.length, "Wache", "Wachen")}</strong><span>Wache anklicken, um die stationierten Fahrzeuge zu sehen.</span></div>${items}`;
}

function renderMap(content) {
  const locations = mapLocations();
  if (overview.map && content.contains(overview.container)) {
    content.querySelector("[data-map-filters]").innerHTML = mapFilterHtml();
    content.querySelector("[data-map-list]").innerHTML = mapListHtml(locations);
    updateMapLayers(locations);
    return;
  }
  destroyOverviewMap();
  content.innerHTML = `<div class="lssfo-map-filters lssfo-panel-card" data-map-filters>${mapFilterHtml()}</div>
    <div class="lssfo-map-layout">
      <aside class="lssfo-map-list" data-map-list>${mapListHtml(locations)}</aside>
      <div class="lssfo-map-stage">
        <div class="lssfo-map-legend"><span><i class="is-ok"></i>vollständig</span><span><i class="is-danger"></i>Fehlbedarf</span><span><i class="is-inactive"></i>inaktiv</span></div>
        <div class="lssfo-map-canvas" aria-label="Karte der Wachen und Fahrzeuge"></div>
      </div>
    </div>`;
  const L = kit.Leaflet();
  const container = content.querySelector(".lssfo-map-canvas");
  if (!L) {
    container.innerHTML = '<div class="lssfo-empty">Die Kartenbibliothek konnte nicht geladen werden. Bitte die Seite neu laden.</div>';
    return;
  }
  const map = L.map(container, { zoomControl: true, preferCanvas: true, minZoom: 5 });
  // Leaflet braucht vor dem ersten Vektor eine gültige Ansicht; eingepasst wird danach.
  map.setView([47.6, 14.2], 7);
  kit.tileLayer().addTo(map);
  overview.map = map;
  overview.container = container;
  overview.markerLayer = L.layerGroup().addTo(map);
  overview.coverage = L.layerGroup().addTo(map);
  overview.signature = "";
  updateMapLayers(locations);
  setTimeout(() => overview.map?.invalidateSize(), 0);
}

function destroyOverviewMap() {
  kit.removeMap(overview.map);
  Object.assign(overview, { map: null, container: null, markers: new Map(), markerLayer: null, districts: null, coverage: null, signature: "" });
}

function districtReadiness() {
  const values = new Map();
  for (const building of state.model.operational) {
    if (!building.district) continue;
    const entry = values.get(building.district) || { buildings: 0, inactive: 0, targetCrew: 0, missingCrew: 0, missingTraining: 0 };
    entry.buildings += 1;
    entry.inactive += building.enabled ? 0 : 1;
    entry.targetCrew += Number(building.summary?.targetCrew || 0);
    entry.missingCrew += Number(building.summary?.missingCrew || 0);
    entry.missingTraining += Number(building.summary?.missingTraining || 0);
    values.set(building.district, entry);
  }
  return values;
}

function updateDistrictLayer() {
  const L = kit.Leaflet();
  const show = settings.values.districtsEnabled && districtGeo();
  if (!show) {
    overview.districts?.remove();
    overview.districts = null;
    return;
  }
  overview.districts ||= L.geoJSON(districtDisplayGeo(), {
    interactive: false,
    onEachFeature: (feature, layer) => layer.bindTooltip("", { permanent: true, direction: "center", className: "lssfo-district-label" }),
  }).addTo(overview.map);
  const dark = shell?.dataset.theme === "dark";
  const readiness = districtReadiness();
  const withScore = settings.values.readinessEnabled;
  overview.districts.eachLayer((layer) => {
    const name = layer.feature.properties.name;
    const values = readiness.get(name);
    const score = values ? Core.readinessScore(values) : null;
    const fill = !withScore ? (dark ? "#f0ad4e" : "#f6b44d") : score >= 90 ? "#34c759" : score >= 70 ? "#ff9500" : score > 0 ? "#ff3b30" : "#8e8e93";
    layer.setStyle({ color: withScore ? fill : dark ? "#f0ad4e" : "#a45c00", weight: 2, opacity: 0.85, fillColor: fill, fillOpacity: withScore ? 0.13 : 0.04, dashArray: "7 5" });
    layer.setTooltipContent(`${esc(name)}${withScore && score !== null ? ` · ${score} %` : ""}`);
  });
}

function updateCoverage() {
  const L = kit.Leaflet();
  overview.coverage.clearLayers();
  if (!settings.values.coverageEnabled) return;
  for (const dispatch of state.model.dispatchCenters) {
    if (!dispatch.hasLocation || (state.mapFilter.dispatch !== "all" && String(dispatch.id) !== state.mapFilter.dispatch)) continue;
    const distances = state.model.operational
      .filter((building) => building.dispatchCenterId === dispatch.id && building.hasLocation)
      .map((building) => kit.haversine(dispatch.latitude, dispatch.longitude, building.latitude, building.longitude));
    const radius = Math.min(Math.max(4000, ...distances) * 1.08, 180000);
    L.circle([dispatch.latitude, dispatch.longitude], { radius, color: "#007aff", weight: 1.5, dashArray: "8 6", fillColor: "#007aff", fillOpacity: 0.035, interactive: false }).addTo(overview.coverage);
  }
}

function markerStyle(building) {
  const vehicles = vehiclesForFilter(building);
  const missing = (building.summary?.missingCrew || 0) > 0 || (building.summary?.missingTraining || 0) > 0;
  const color = !building.enabled ? ["#5f666b", "#8e8e93"] : missing ? ["#a1131b", "#ff3b30"] : ["#1f7a35", "#34c759"];
  return { radius: Math.min(14, 6 + Math.sqrt(vehicles.length)), weight: 2, color: color[0], fillColor: color[1], fillOpacity: 0.88 };
}

function markerTooltip(building) {
  return `${esc(building.caption)} · ${plural(vehiclesForFilter(building).length, state.mapFilter.vehicleType === "all" ? "Fahrzeug" : "passendes Fahrzeug", state.mapFilter.vehicleType === "all" ? "Fahrzeuge" : "passende Fahrzeuge")}`;
}

function popupHtml(id) {
  const building = state.model.buildingById.get(id);
  if (!building) return "";
  const vehicles = vehiclesForFilter(building).slice().sort((a, b) => collator.compare(a.caption, b.caption));
  const missingVehicles = vehicles.filter((vehicle) => vehicle.hasMissing).length;
  const rows = vehicles.map((vehicle) => {
    const status = vehicle.missingCrew > 0 ? `${plural(vehicle.missingCrew, "Person fehlt", "Personen fehlen")}` : vehicle.missingTraining > 0 ? `${vehicle.missingTraining} Ausbildung fehlt` : "vollständig";
    return `<li class="${vehicle.hasMissing ? "has-missing" : "is-complete"}"><span>${gameLink(`/vehicles/${vehicle.id}/zuweisung`, vehicle.caption)}<small>${esc(vehicle.typeCaption)} · ${vehicle.assigned}/${vehicle.target} Personen</small></span><b>${esc(status)}</b></li>`;
  }).join("") || '<li class="lssfo-muted">Keine Fahrzeuge an dieser Wache</li>';
  const hint = state.mapFilter.vehicleType === "all" ? "stationiert" : `passend · insgesamt ${formatNumber(building.vehicles.length)}`;
  return `<div class="lssfo-popup"><h3>${gameLink(`/buildings/${id}`, building.caption)}</h3>
    <div class="lssfo-popup-meta">${building.district ? `<span class="lssfo-chip">Bezirk ${esc(building.district)}</span>` : ""}${statusCell(building)}</div>
    <p>${plural(vehicles.length, "Fahrzeug", "Fahrzeuge")} ${hint} · <strong class="${missingVehicles ? "is-danger" : "is-ok"}">${missingVehicles ? `${plural(missingVehicles, "Fahrzeug", "Fahrzeuge")} mit Fehlbedarf` : "Besatzung vollständig"}</strong></p>
    <ul>${rows}</ul></div>`;
}

function updateMapLayers(locations) {
  const L = kit.Leaflet();
  if (!overview.map || !L) return;
  updateDistrictLayer();
  updateCoverage();
  const wanted = new Set(locations.map((building) => building.id));
  for (const [id, marker] of overview.markers) {
    if (wanted.has(id)) continue;
    overview.markerLayer.removeLayer(marker);
    overview.markers.delete(id);
  }
  for (const building of locations) {
    let marker = overview.markers.get(building.id);
    if (!marker) {
      // Popup-Inhalt entsteht erst beim Öffnen.
      marker = L.circleMarker([building.latitude, building.longitude], markerStyle(building))
        .bindTooltip(markerTooltip(building))
        .bindPopup(() => popupHtml(building.id), { maxWidth: 440, maxHeight: 390 });
      overview.markerLayer.addLayer(marker);
      overview.markers.set(building.id, marker);
    } else {
      marker.setStyle(markerStyle(building));
      marker.setTooltipContent(markerTooltip(building));
      if (marker.isPopupOpen()) marker.setPopupContent(popupHtml(building.id));
    }
  }
  // Neu eingepasst wird nur, wenn sich die Auswahl der Wachen geändert hat.
  const signature = locations.map((building) => building.id).join(",");
  if (signature === overview.signature) return;
  overview.signature = signature;
  if (locations.length === 1) overview.map.setView([locations[0].latitude, locations[0].longitude], 13);
  else if (locations.length) overview.map.fitBounds(locations.map((building) => [building.latitude, building.longitude]), { padding: [28, 28], maxZoom: 13 });
}

function focusMapBuilding(id) {
  const marker = overview.markers.get(id);
  if (!marker || !overview.map) return;
  overview.map.setView(marker.getLatLng(), Math.max(overview.map.getZoom(), 13), { animate: true });
  marker.openPopup();
}

kit.on({
  click: {
    "map-focus": (element) => focusMapBuilding(Number(element.dataset.id)),
    "map-filter-reset": () => {
      state.mapFilter = { vehicleType: "all", buildingType: "all", district: "all", dispatch: "all" };
      renderContent();
    },
  },
  change: {
    "map-filter": (element) => {
      state.mapFilter[element.dataset.filter] = element.value;
      renderContent();
    },
    "map-districts": (element) => {
      settings.set({ districtsEnabled: element.checked });
      renderContent();
    },
    "map-readiness": (element) => {
      settings.set({ readinessEnabled: element.checked });
      renderContent();
    },
    "map-coverage": (element) => {
      settings.set({ coverageEnabled: element.checked });
      renderContent();
    },
  },
});

// ---- lss_verwaltung/src/editor.js ----
/*
 * Fahrzeuge bearbeiten (Name, maximale Besatzung, Umbau) und Umrüsten.
 * Änderungen sammeln sich lokal und gehen erst mit „Alle speichern“ an das Spiel –
 * im Hintergrund über das originale Bearbeitungsformular, ohne Neuladen.
 */

const replaceDraft = { find: "", replacement: "" };

function editableVehicles() {
  return state.model.vehicles.filter((vehicle) => (state.editBuilding === "all" || String(vehicle.buildingId) === state.editBuilding)
    && (matches(vehicle.search) || matches(String(state.edits[vehicle.id]?.caption || "").toLocaleLowerCase("de"))));
}

function originalValue(id, field) {
  const raw = rawVehicle(id) || {};
  if (field === "caption") return String(raw.caption ?? "");
  if (field === "max") return String(Number(raw.max_personnel_override) > 0 ? Number(raw.max_personnel_override) : 0);
  return String(raw.vehicle_type ?? "");
}

const currentValue = (vehicle, field) => state.edits[vehicle.id]?.[field] ?? (field === "caption" ? vehicle.caption : originalValue(vehicle.id, field));

function editStatusHtml(id) {
  const status = state.editStatus[id];
  if (status === "saving") return badge("speichert …");
  if (status === "saved") return badge("gespeichert", "ok");
  if (status) return badge("Fehler", "danger", status);
  return state.edits[id] ? badge("geändert", "warn") : "";
}

const editStatusLabel = (id) => ({ saving: "speichert", saved: "gespeichert" })[state.editStatus[id]] || (state.editStatus[id] ? `Fehler: ${state.editStatus[id]}` : state.edits[id] ? "geändert" : "");

function upgradeCell(vehicle) {
  const options = state.editOptions[vehicle.id];
  if (!options) return `<button type="button" class="lssfo-btn is-small" data-action="edit-options" data-id="${vehicle.id}">prüfen</button>`;
  if (options === "loading") return `<span class="lssfo-muted">${spinner()} lädt …</span>`;
  if (options.error) return `<span class="lssfo-muted" title="${esc(options.error)}">nicht abrufbar</span>`;
  if (state.refitStarted[vehicle.id]) return badge("Umrüstung läuft", "warn");
  if (options.refitUrl) return `<button type="button" class="lssfo-btn is-small" data-action="refit-open" data-id="${vehicle.id}">Umrüsten …</button>`;
  if (!options.types.length) return '<span class="lssfo-muted">kein Umbau</span>';
  const changed = "type" in (state.edits[vehicle.id] || {});
  return kit.selectHtml(`class="lssfo-inline-input${changed ? " is-changed" : ""}" data-change="edit-field" data-id="${vehicle.id}" data-field="type" aria-label="Umbau"`, options.types, currentValue(vehicle, "type"));
}

function editorTable() {
  return {
    key: "edit",
    rows: editableVehicles(),
    columns: [
      { label: "Wache", value: (row) => row.buildingCaption, html: (row) => gameLink(`/buildings/${row.buildingId}`, row.buildingCaption) },
      {
        label: "Name",
        value: (row) => currentValue(row, "caption"),
        html: (row) => `<input class="lssfo-inline-input${"caption" in (state.edits[row.id] || {}) ? " is-changed" : ""}" type="text" maxlength="40" data-input="edit-field" data-id="${row.id}" data-field="caption" value="${esc(currentValue(row, "caption"))}" aria-label="Name von ${esc(row.caption)}">`,
      },
      { label: "Typ", value: (row) => row.typeCaption },
      {
        label: "Max. Besatzung",
        value: (row) => Number(currentValue(row, "max")) || row.staffMax,
        html: (row) => {
          const value = currentValue(row, "max");
          const options = [{ value: "0", label: `Standard (${row.staffMax})` }];
          for (let count = 1; count <= Math.max(row.staffMax, Number(value) || 0); count += 1) options.push({ value: String(count), label: String(count) });
          return kit.selectHtml(`class="lssfo-inline-input${"max" in (state.edits[row.id] || {}) ? " is-changed" : ""}" data-change="edit-field" data-id="${row.id}" data-field="max" aria-label="Maximale Besatzung"`, options, value);
        },
      },
      { label: "Umbau", value: () => null, sortable: false, csv: false, html: upgradeCell },
      { label: "Status", value: (row) => editStatusLabel(row.id), html: (row) => `<span data-edit-status="${row.id}">${editStatusHtml(row.id)}</span>` },
    ],
  };
}

function renderEditor(content) {
  const { key, columns, rows } = editorTable();
  const buildings = [...new Map(state.model.vehicles.map((vehicle) => [String(vehicle.buildingId), vehicle.buildingCaption]))]
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => collator.compare(a.label, b.label));
  content.innerHTML = `<div class="lssfo-editor lssfo-panel-card">
      <label class="lssfo-field"><span>Wache</span>${kit.selectHtml('data-change="edit-building"', [{ value: "all", label: "Alle Wachen" }, ...buildings], state.editBuilding)}</label>
      ${state.editBuilding !== "all" ? `<button type="button" class="lssfo-btn" data-action="edit-options-all">Umbau prüfen (${formatNumber(rows.length)})</button>` : ""}
      <div class="lssfo-editor-group">
        <label class="lssfo-field"><span>Im Namen suchen</span><input type="text" data-input="edit-find" value="${esc(replaceDraft.find)}" placeholder="z. B. Florian"></label>
        <label class="lssfo-field"><span>ersetzen durch</span><input type="text" data-input="edit-replacement" value="${esc(replaceDraft.replacement)}" placeholder="z. B. Florian NÖ"></label>
        <button type="button" class="lssfo-btn" data-action="edit-replace">Bei ${plural(rows.length, "Fahrzeug", "Fahrzeugen")} anwenden</button>
      </div>
      <div class="lssfo-editor-save"><span data-edit-count></span><button type="button" class="lssfo-btn" data-action="edit-discard">Verwerfen</button><button type="button" class="lssfo-btn is-primary" data-action="edit-save">${state.editSaving ? `${spinner()} Speichert …` : "Alle speichern"}</button></div>
    </div>
    ${callout("", "Änderungen gehen erst mit „Alle speichern“ an das Spiel – im Hintergrund, ohne die Seite neu zu laden. „prüfen“ zeigt, ob sich ein Fahrzeug umbauen oder umrüsten lässt; Umrüstungen werden einzeln bestätigt und nur mit Credits bezahlt.")}
    ${renderTable(key, columns, rows)}`;
  updateEditBar();
}

function updateEditBar() {
  const count = Object.keys(state.edits).length;
  const counter = shell?.querySelector("[data-edit-count]");
  if (counter) counter.textContent = count ? `${plural(count, "Fahrzeug", "Fahrzeuge")} geändert` : "Keine offenen Änderungen";
  for (const button of shell?.querySelectorAll('[data-action="edit-save"], [data-action="edit-discard"]') || []) button.disabled = !count || state.editSaving;
  const tabCount = shell?.querySelector('[data-tab-count="edit"]');
  if (tabCount) tabCount.textContent = formatNumber(count);
}

function setEdit(id, field, value) {
  const edits = state.edits[id] || {};
  if (String(value) === originalValue(id, field) || (field === "caption" && !String(value).trim())) delete edits[field];
  else edits[field] = String(value);
  if (Object.keys(edits).length) state.edits[id] = edits;
  else delete state.edits[id];
  delete state.editStatus[id];
  shell?.querySelector(`[data-id="${id}"][data-field="${field}"]`)?.classList.toggle("is-changed", field in edits);
  const status = shell?.querySelector(`[data-edit-status="${id}"]`);
  if (status) status.innerHTML = editStatusHtml(id);
  updateEditBar();
}

function setEditStatus(id, value) {
  state.editStatus[id] = value;
  const cell = shell?.querySelector(`[data-edit-status="${id}"]`);
  if (cell) cell.innerHTML = editStatusHtml(id);
}

// Findet im Bearbeitungsformular das Auswahlfeld für Fahrzeugtyp bzw. Umbau.
function findUpgradeSelect(form) {
  return form.querySelector('select[name="vehicle[vehicle_type]"], select[name*="vehicle_type"], select[name*="upgrade"]')
    || [...form.querySelectorAll("select")].find((select) => {
      const label = select.id ? form.querySelector(`label[for="${CSS.escape(select.id)}"]`) : select.closest("label, .form-group")?.querySelector("label");
      return /fahrzeugtyp|umbau|upgrade|umrüst/i.test(`${label?.textContent || ""} ${select.name}`);
    })
    || null;
}

async function fetchVehicleForm(id, options = {}) {
  const doc = kit.parseHtml(await kit.getHtml(`/vehicles/${id}/edit`, options));
  const nameInput = doc.querySelector('#vehicle_caption, input[name="vehicle[caption]"]');
  const form = nameInput?.closest("form");
  if (!form) throw new Error("Bearbeitungsformular nicht gefunden");
  return { form, nameInput, maxInput: form.querySelector('#vehicle_personal_max, [name="vehicle[personal_max]"], [name="vehicle[max_personnel_override]"]'), typeSelect: findUpgradeSelect(form) };
}

// Sucht auf der Fahrzeugseite den Link „Umrüsten“. Ohne Link ist keine Umrüstung möglich.
async function findRefitUrl(id, options = {}) {
  const doc = kit.parseHtml(await kit.getHtml(`/vehicles/${id}`, options));
  const pattern = new RegExp(`/vehicles/${id}/(?:umruest|refit|upgrade|conversion)`, "i");
  const link = [...doc.querySelectorAll("a[href]")].find((anchor) => /umrüst/i.test(`${anchor.textContent} ${anchor.title}`) || pattern.test(anchor.getAttribute("href") || ""));
  if (!link) return null;
  const url = new URL(link.getAttribute("href"), location.origin);
  return url.pathname + url.search;
}

async function loadVehicleOptions(id, { rerender = true, priority = true } = {}) {
  state.editOptions[id] = "loading";
  if (rerender) renderContent();
  try {
    const [{ typeSelect }, refitUrl] = await Promise.all([fetchVehicleForm(id, { priority }), findRefitUrl(id, { priority }).catch(() => null)]);
    const types = typeSelect ? [...typeSelect.options].filter((option) => option.value !== "").map((option) => ({ value: option.value, label: option.textContent.trim() })) : [];
    state.editOptions[id] = { types: types.length > 1 ? types : [], refitUrl };
  } catch (error) {
    state.editOptions[id] = { types: [], error: error.message };
  }
  if (rerender && state.tab === "edit") renderContent();
}

// Umbau-Möglichkeiten aller Fahrzeuge der gewählten Wache – die Warteschlange hält die Last gering.
async function loadBuildingOptions() {
  const ids = editableVehicles().map((vehicle) => vehicle.id).filter((id) => !state.editOptions[id]);
  for (const id of ids) state.editOptions[id] = "loading";
  renderContent();
  await Promise.all(ids.map((id) => loadVehicleOptions(id, { rerender: false, priority: false })));
  if (state.tab === "edit") renderContent();
}

function applyNameReplace() {
  const { find, replacement } = replaceDraft;
  if (!find) return;
  let changed = 0;
  for (const vehicle of editableVehicles()) {
    const current = currentValue(vehicle, "caption");
    if (!current.includes(find)) continue;
    setEdit(vehicle.id, "caption", current.split(find).join(replacement).slice(0, 40));
    changed += 1;
  }
  renderContent();
  if (!changed) kit.toast(`„${find}“ kommt in keinem Namen vor.`);
}

async function saveEdits() {
  const ids = Object.keys(state.edits).map(Number);
  if (state.editSaving || !ids.length) return;
  state.editSaving = true;
  renderContent();
  await Promise.all(ids.map(async (id) => {
    const edits = { ...state.edits[id] };
    setEditStatus(id, "saving");
    try {
      const { form, nameInput, maxInput, typeSelect } = await fetchVehicleForm(id, { priority: true });
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
      const response = await kit.submitForm(form);
      // Validierungsfehler zeigt das Spiel im erneut ausgelieferten Formular.
      const answer = kit.parseHtml(await response.text().catch(() => ""));
      const problem = answer.querySelector("#vehicle_caption") && answer.querySelector("#error_explanation, .field_with_errors, .has-error");
      if (problem) throw new Error(kit.textOf(problem).slice(0, 160) || "vom Spiel abgelehnt");
      const raw = rawVehicle(id);
      if (raw) {
        if ("caption" in edits) raw.caption = edits.caption.trim();
        if ("max" in edits) raw.max_personnel_override = Number(edits.max) > 0 ? Number(edits.max) : null;
        if ("type" in edits) raw.vehicle_type = Number(edits.type);
      }
      delete state.edits[id];
      setEditStatus(id, "saved");
    } catch (error) {
      setEditStatus(id, error.message || "Speichern fehlgeschlagen");
    }
  }));
  state.editSaving = false;
  analyze();
  render();
  saveData();
}

/* ---------- Umrüsten ---------- */

let refit = null;

// Liest das Umrüst-Formular allgemein: Vorlage, Zahlenfelder mit Grenzen und den Credits-Knopf.
function parseRefitForm(html) {
  const doc = kit.parseHtml(html);
  const creditButton = [...doc.querySelectorAll('button, input[type="submit"]')].find((button) => /credits/i.test(button.textContent || button.value || ""));
  const form = creditButton?.closest("form") || creditButton?.form || [...doc.querySelectorAll("form")].find((entry) => /umrüst/i.test(entry.textContent)) || null;
  if (!form) throw new Error("Umrüst-Formular nicht gefunden");
  const preset = form.querySelector("select");
  const firstNumber = (...values) => values.map((value) => (value === null || value === undefined || value === "" ? NaN : Number(value))).find(Number.isFinite);
  const fields = [...form.querySelectorAll("input")]
    .filter((input) => !["hidden", "submit", "button", "checkbox", "radio", "range"].includes((input.type || "text").toLowerCase()))
    .map((input, index) => {
      const block = input.closest(".form-group") || input.closest(".row")?.parentElement || input.parentElement;
      const range = block?.querySelector('input[type="range"], [data-slider-min], [data-min]');
      return {
        key: input.name || input.id || `field-${index}`,
        label: kit.textOf(block?.querySelector("label, strong, b, h4, h5")) || input.name || `Wert ${index + 1}`,
        hint: kit.textOf(block?.querySelector("p, .help-block, small")),
        value: input.value,
        min: firstNumber(input.min, range?.min, range?.dataset?.sliderMin, range?.dataset?.min),
        max: firstNumber(input.max, range?.max, range?.dataset?.sliderMax, range?.dataset?.max),
      };
    });
  return {
    form,
    info: kit.textOf(doc.querySelector(".alert-info, .alert")),
    preset: preset ? { label: kit.textOf(preset.closest(".input-group, .form-group")?.querySelector(".input-group-addon, label")) || "Umrüstung", options: [...preset.options].map((option) => ({ value: option.value, label: kit.textOf(option), data: { ...option.dataset } })) } : null,
    presetValue: preset?.value,
    fields,
    creditLabel: kit.textOf(creditButton) || creditButton?.value || "Mit Credits umrüsten",
    creditName: creditButton?.name || "",
    creditValue: creditButton?.value || "",
    creditAction: creditButton?.getAttribute("formaction") || "",
  };
}

async function openRefit(id) {
  const url = state.editOptions[id]?.refitUrl;
  if (!url) return;
  refit?.dialog.close();
  const vehicle = state.model.vehicleById.get(id);
  const current = { id, caption: vehicle?.caption || `Fahrzeug ${id}`, loading: true, values: {}, confirming: false };
  current.dialog = kit.openDialog({ label: "Fahrzeug umrüsten", size: "md", onClose: () => { if (refit === current) refit = null; } });
  refit = current;
  renderRefit();
  try {
    const parsed = parseRefitForm(await kit.getHtml(url, { priority: true }));
    Object.assign(current, parsed, { loading: false, values: Object.fromEntries(parsed.fields.map((field) => [field.key, field.value])) });
    if (parsed.preset) current.values.__preset = parsed.presetValue;
  } catch (error) {
    Object.assign(current, { loading: false, error: error.message });
  }
  if (refit === current) renderRefit();
}

function renderRefit() {
  if (!refit) return;
  let body;
  if (refit.loading) body = `<div class="lssfo-empty is-small">${spinner()} Umrüst-Möglichkeiten werden geladen …</div>`;
  else if (refit.error) body = note("error", `Die Umrüstung konnte nicht geladen werden: ${esc(refit.error)}`);
  else if (refit.done) body = `<div class="lssfo-center"><div class="lssfo-success">${icon("check")}</div><p class="lssfo-dialog-text"><b>${esc(refit.caption)}</b> wird umgerüstet und steht währenddessen nicht zur Verfügung.</p></div>`;
  else {
    const preset = refit.preset ? `<label class="lssfo-field lssfo-refit-preset"><span>${esc(refit.preset.label)}</span>${kit.selectHtml('data-change="refit-preset"', refit.preset.options, refit.values.__preset)}</label>` : "";
    const fields = refit.fields.map((field) => `<label class="lssfo-refit-field"><strong>${esc(field.label)}</strong>${field.hint ? `<small>${esc(field.hint)}</small>` : ""}<span><input class="lssfo-input" type="number" data-input="refit-field" data-key="${esc(field.key)}" value="${esc(refit.values[field.key] ?? "")}"${Number.isFinite(field.min) ? ` min="${field.min}"` : ""}${Number.isFinite(field.max) ? ` max="${field.max}"` : ""}>${Number.isFinite(field.min) && Number.isFinite(field.max) ? `<em>${formatNumber(field.min)} – ${formatNumber(field.max)}</em>` : ""}</span></label>`).join("");
    body = `${refit.info ? callout("", esc(refit.info)) : ""}${preset}<div class="lssfo-refit-grid">${fields || '<div class="lssfo-empty is-small">Für dieses Fahrzeug gibt es keine einstellbaren Werte.</div>'}</div>`;
  }
  refit.dialog.render(`${kit.dialogHead({ kicker: "Fahrzeug umrüsten", title: refit.caption, glyph: kit.glyph("#5856d6", "vehicle") })}
    <div class="lssfo-dialog-body">${body}</div>
    <footer class="lssfo-dialog-foot" data-refit-foot></footer>`);
  updateRefitFooter();
}

function updateRefitFooter() {
  const footer = refit?.dialog.element.querySelector("[data-refit-foot]");
  if (!footer) return;
  if (refit.loading || refit.error || refit.done) {
    footer.innerHTML = '<button type="button" class="lssfo-btn" data-action="dialog-dismiss">Schließen</button>';
    return;
  }
  const invalid = refit.fields.find((field) => {
    const value = Number(refit.values[field.key]);
    return !Number.isFinite(value) || (Number.isFinite(field.min) && value < field.min) || (Number.isFinite(field.max) && value > field.max);
  });
  const message = refit.submitting ? "Wird an das Spiel übertragen …"
    : invalid ? `„${esc(invalid.label)}“ liegt außerhalb des erlaubten Bereichs.`
      : refit.confirming ? `<strong>Wirklich umrüsten?</strong> Bezahlt wird mit Credits (${esc(refit.creditLabel.replace(/^.*\(|\).*$/g, ""))} laut Spiel für die Ausgangswerte – bei geänderten Werten berechnet das Spiel den Preis neu). Das Fahrzeug steht während der Umrüstung nicht zur Verfügung.`
        : "Coins werden nie verwendet. Umgerüstet wird erst nach Bestätigung.";
  footer.innerHTML = `<span class="lssfo-refit-note">${message}</span>
    <button type="button" class="lssfo-btn" data-action="dialog-dismiss">Abbrechen</button>
    ${refit.confirming
      ? `<button type="button" class="lssfo-btn is-primary" data-action="refit-submit"${invalid || refit.submitting ? " disabled" : ""}>Ja, mit Credits umrüsten</button>`
      : `<button type="button" class="lssfo-btn is-primary" data-action="refit-confirm"${invalid ? " disabled" : ""}>${esc(refit.creditLabel)}</button>`}`;
}

// Vorlage gewählt: Werte übernehmen, wenn das Spiel sie an der Option mitliefert (data-Attribute).
function applyRefitPreset(value) {
  if (!refit?.preset) return;
  refit.values.__preset = value;
  refit.confirming = false;
  const option = refit.preset.options.find((entry) => entry.value === value);
  for (const field of refit.fields) {
    const short = field.key.replace(/^.*\[|\]$/g, "").toLowerCase().replace(/_/g, "");
    const candidate = Object.entries(option?.data || {}).find(([key]) => key.toLowerCase().includes(short));
    if (candidate) refit.values[field.key] = String(candidate[1]);
    else if (/^max/i.test(value) && Number.isFinite(field.max)) refit.values[field.key] = String(field.max);
  }
  renderRefit();
}

async function submitRefit() {
  const current = refit;
  if (!current?.form || current.submitting) return;
  current.submitting = true;
  updateRefitFooter();
  try {
    const { form } = current;
    if (current.preset && current.values.__preset !== undefined) form.querySelector("select").value = current.values.__preset;
    for (const field of current.fields) {
      const input = form.querySelector(`[name="${CSS.escape(field.key)}"], #${CSS.escape(field.key)}`);
      if (input) input.value = current.values[field.key];
      // Zugehörigen Schieberegler mitziehen, falls das Spiel dessen Wert liest.
      const slider = input?.closest(".form-group, div")?.querySelector('input[type="range"]');
      if (slider) slider.value = current.values[field.key];
    }
    if (current.creditAction) form.setAttribute("action", current.creditAction);
    const response = await kit.submitForm(form, current.creditName ? [[current.creditName, current.creditValue]] : []);
    const problem = kit.parseHtml(await response.text().catch(() => "")).querySelector(".alert-danger");
    if (problem && /credit|nicht genug|fehler|ungültig/i.test(problem.textContent)) throw new Error(kit.textOf(problem).slice(0, 200));
    state.refitStarted[current.id] = true;
    current.done = true;
    if (state.tab === "edit") renderContent();
  } catch (error) {
    current.confirming = false;
    current.info = `Umrüstung fehlgeschlagen: ${error.message}`;
  } finally {
    current.submitting = false;
    if (refit === current) renderRefit();
  }
}

kit.on({
  click: {
    "edit-save": () => void saveEdits(),
    "edit-discard": () => {
      state.edits = {};
      state.editStatus = {};
      renderContent();
    },
    "edit-replace": applyNameReplace,
    "edit-options": (element) => void loadVehicleOptions(Number(element.dataset.id)),
    "edit-options-all": () => void loadBuildingOptions(),
    "refit-open": (element) => void openRefit(Number(element.dataset.id)),
    "refit-confirm": () => {
      if (!refit) return;
      refit.confirming = true;
      updateRefitFooter();
    },
    "refit-submit": () => void submitRefit(),
  },
  change: {
    "edit-field": (element) => setEdit(Number(element.dataset.id), element.dataset.field, element.value),
    "edit-building": (element) => {
      state.editBuilding = element.value;
      renderContent();
    },
    "refit-preset": (element) => applyRefitPreset(element.value),
  },
  input: {
    "edit-field": (element) => setEdit(Number(element.dataset.id), element.dataset.field, element.value),
    "edit-find": (element) => { replaceDraft.find = element.value; },
    "edit-replacement": (element) => { replaceDraft.replacement = element.value; },
    "refit-field": (element) => {
      if (!refit) return;
      refit.values[element.dataset.key] = element.value;
      refit.confirming = false;
      updateRefitFooter();
    },
  },
});

// ---- lss_verwaltung/src/manager.js ----
/*
 * Verwaltung einzelner Fahrzeuge und Wachen (Stammdaten, Leitstelle, Status, Personal),
 * Lehrgangsassistent und Spielseiten direkt im Panel.
 */

let manager = null;

async function openManager(kind, id) {
  const entity = kind === "vehicle" ? rawVehicle(id) : rawBuilding(id);
  if (!entity) return;
  manager?.dialog.close();
  const current = {
    kind, id, entity,
    name: entity.caption || "",
    loading: true, saving: false, savingPerson: null, error: "", notice: "",
    form: null, nameInput: null, maxInput: null, maxPersonnel: "", dispatchInput: null, dispatchCenterId: "", dispatchOptions: [],
    personnel: [], personQuery: "", csrf: "",
  };
  current.dialog = kit.openDialog({ label: `${kind === "vehicle" ? "Fahrzeug" : "Wache"} bearbeiten`, size: "lg", onClose: () => { if (manager === current) manager = null; } });
  manager = current;
  renderManager();
  if (kind === "building") {
    try {
      const html = await kit.getHtml(`/buildings/${id}/edit`, { priority: true });
      if (!parseEditForm(html, current)) current.error = "Das Bearbeitungsformular wurde nicht vollständig erkannt; Name und Status bleiben verfügbar.";
    } catch (error) {
      current.error = `Leitstellenzuordnung konnte nicht geladen werden: ${error.message}`;
    }
  } else {
    const [edit, assignment] = await Promise.allSettled([kit.getHtml(`/vehicles/${id}/edit`, { priority: true }), kit.getHtml(`/vehicles/${id}/zuweisung`, { priority: true })]);
    const problems = [];
    if (edit.status === "rejected") problems.push(`Fahrzeugeinstellungen: ${edit.reason?.message || edit.reason}`);
    else if (!parseEditForm(edit.value, current)) problems.push("Fahrzeugeinstellungen wurden nicht erkannt");
    if (assignment.status === "rejected") problems.push(`Personalzuweisung: ${assignment.reason?.message || assignment.reason}`);
    else parsePersonnelPage(assignment.value, current);
    if (problems.length) current.error = `Nur teilweise geladen: ${problems.join(" · ")}`;
  }
  current.loading = false;
  if (manager === current) renderManager();
}

function parseEditForm(html, target) {
  const doc = kit.parseHtml(html);
  const selectors = target.kind === "vehicle"
    ? '#vehicle_caption, input[name="vehicle[caption]"], input[name="caption"]'
    : '#building_caption, input[name="building[caption]"], input[name="caption"]';
  const nameInput = doc.querySelector(selectors);
  const form = nameInput?.closest("form") || doc.querySelector("form");
  if (!form || !nameInput) return false;
  target.form = form;
  target.nameInput = nameInput;
  target.name = nameInput.value || target.name;
  if (target.kind === "vehicle") {
    target.maxInput = form.querySelector('#vehicle_personal_max, [name="vehicle[personal_max]"], [name="vehicle[max_personnel_override]"]');
    target.maxPersonnel = target.maxInput?.value ?? "";
  } else {
    target.dispatchInput = form.querySelector('[name="building[leitstelle_building_id]"], #building_leitstelle_building_id');
    target.dispatchCenterId = target.dispatchInput?.value ?? "";
    target.dispatchOptions = target.dispatchInput ? [...target.dispatchInput.options].map((option) => ({ value: option.value, label: option.textContent.trim() || "Ohne Leitstelle" })) : [];
  }
  return true;
}

const PERSON_STATUS = /^(verfügbar|frei\b|im fahrzeug|im unterricht|im einsatz|nicht verfügbar|in ausbildung)/i;

function educationKeys(row) {
  let keys = [];
  try { keys = JSON.parse(row.dataset.filterableBy || "[]"); } catch { keys = []; }
  for (const element of row.querySelectorAll("[data-education-key]")) keys.push(element.dataset.educationKey);
  return [...new Set(keys.filter(Boolean))];
}

// Personalzuweisungsseite eines Fahrzeugs: Personen, Ausbildungen, Status und Schalter.
function parsePersonnelPage(html, target) {
  const doc = kit.parseHtml(html);
  target.csrf = doc.querySelector('meta[name="csrf-token"]')?.content || kit.csrfToken();
  const rows = [...doc.querySelectorAll("tbody tr")].filter((row) => row.id.startsWith("personal_") || row.querySelector("[personal_id]"));
  target.personnel = rows.map((row, index) => {
    const assignedButton = row.querySelector("a.btn-assigned");
    const actionButton = assignedButton || row.querySelector("a.btn-success");
    const id = Number(actionButton?.getAttribute("personal_id") || row.id.replace(/\D/g, "")) || index + 1;
    const cells = [...row.querySelectorAll("td")];
    const assigned = Boolean(assignedButton);
    // An ein anderes Fahrzeug gebunden: Fahrzeuglink, der nicht auf dieses Fahrzeug zeigt …
    const vehicleLink = [...row.querySelectorAll('a[href*="/vehicles/"]')]
      .map((anchor) => ({ anchor, match: (anchor.getAttribute("href") || "").match(/\/vehicles\/(\d+)\/?$/) }))
      .find((entry) => entry.match && Number(entry.match[1]) !== Number(target.id));
    let boundTo = vehicleLink ? { id: Number(vehicleLink.match[1]), caption: kit.textOf(vehicleLink.anchor) || `Fahrzeug ${vehicleLink.match[1]}` } : null;
    // … oder ohne Link der Text der Spalte „Zugewiesen an“ (letzte Spalte ohne Schaltflächen).
    const lastCell = cells.length >= 4 ? cells[cells.length - 1] : null;
    if (!boundTo && !assigned && lastCell?.querySelector("a.btn, button, [personal_id]")) {
      const clone = lastCell.cloneNode(true);
      clone.querySelectorAll("a, button").forEach((element) => element.remove());
      const caption = kit.textOf(clone);
      if (caption && !PERSON_STATUS.test(caption)) boundTo = { id: null, caption };
    }
    const statusText = cells.slice(1).map(kit.textOf).find((text) => PERSON_STATUS.test(text)) || "";
    const keys = educationKeys(row);
    return {
      id,
      name: kit.textOf(cells[0]) || `Person ${id}`,
      keys,
      education: keys.length ? keys.map(trainingName).join(", ") : "Keine Ausbildung",
      assigned,
      boundTo: assigned ? null : boundTo,
      status: /unterricht|ausbildung/i.test(statusText) ? "training" : /im fahrzeug|im einsatz|nicht verfügbar/i.test(statusText) ? "busy" : "free",
      statusText,
      actionHref: actionButton?.getAttribute("href") || "",
      available: Boolean(actionButton),
    };
  });
}

function personStatusLabel(person) {
  if (person.assigned) return "zugewiesen";
  if (person.status === "training") return person.statusText || "im Unterricht";
  if (person.boundTo) return `an ${person.boundTo.caption}`;
  if (person.status === "busy") return person.statusText;
  return "verfügbar";
}

function personStatusHtml(person) {
  if (person.assigned) return badge("zugewiesen", "ok");
  const extra = person.status === "training" || (person.status === "busy" && !person.boundTo) ? ` <small class="lssfo-muted">${esc(person.statusText)}</small>` : "";
  if (person.boundTo) {
    const target = person.boundTo.id ? gameLink(`/vehicles/${person.boundTo.id}`, person.boundTo.caption) : esc(person.boundTo.caption);
    return `${badge("anderes Fahrzeug", "warn")} <small>${target}</small>${extra}`;
  }
  if (person.status === "training") return `${badge("im Unterricht")}${extra}`;
  if (person.status === "busy") return /nicht verfügbar/i.test(person.statusText) ? badge("nicht verfügbar") : `${badge("unterwegs")}${extra}`;
  return '<span class="lssfo-muted">verfügbar</span>';
}

function personnelTableHtml(requiredKeys, capacity) {
  if (!manager.personnel.length) return '<div class="lssfo-empty is-small">Kein zuweisbares Personal an dieser Wache gefunden.</div>';
  const full = manager.personnel.filter((person) => person.assigned).length >= capacity;
  const fits = (person) => !requiredKeys.length || requiredKeys.some((key) => person.keys.includes(key));
  const columns = [
    { label: "Person", value: (row) => row.name, html: (row) => `<strong>${esc(row.name)}</strong>` },
    { label: "Ausbildungen", value: (row) => row.education, html: (row) => `${esc(row.education)} ${fits(row) && requiredKeys.length ? badge("passend", "ok") : ""}` },
    { label: "Status", value: personStatusLabel, html: personStatusHtml },
    {
      label: "Aktion",
      value: (row) => (row.assigned ? "Entfernen" : "Zuweisen"),
      html: (row) => {
        const disabled = !row.available || manager.savingPerson !== null || (!row.assigned && full);
        const label = manager.savingPerson === row.id ? "Bitte warten …" : row.assigned ? "Entfernen" : row.boundTo ? "Umsetzen" : "Zuweisen";
        return `<button type="button" class="lssfo-btn is-small${row.assigned ? " is-danger" : ""}" data-action="person-toggle" data-id="${row.id}"${disabled ? " disabled" : ""}${row.boundTo ? ` title="Wird von ${esc(row.boundTo.caption)} abgezogen"` : ""}>${label}</button>`;
      },
    },
  ];
  // Zugewiesene zuerst, dann freie, an andere Fahrzeuge gebundene, zuletzt Personen im Unterricht;
  // ohne gewählte Sortierung passende Ausbildungen vor dem Rest.
  const rank = (person) => (person.assigned ? 0 : person.status === "training" ? 3 : person.boundTo ? 2 : 1) * 2 + (state.sorts[MANAGER_TABLE] || fits(person) ? 0 : 1);
  const people = manager.personnel.slice().sort((a, b) => collator.compare(a.name, b.name));
  return renderTable(MANAGER_TABLE, columns, people, {
    rank,
    meta: false,
    className: "lssfo-personnel",
    rowAttributes: (person) => {
      const search = `${person.name} ${person.education}`.toLocaleLowerCase("de");
      return ` data-person-search="${esc(search)}"${manager.personQuery && !search.includes(manager.personQuery) ? " hidden" : ""}`;
    },
  });
}

function renderManager() {
  if (!manager) return;
  const body = manager.dialog.element.querySelector(".lssfo-dialog-body");
  const scrollTop = body?.scrollTop || 0;
  const isVehicle = manager.kind === "vehicle";
  const analyzed = isVehicle ? state.model?.vehicleById.get(manager.id) : null;
  const building = !isVehicle ? state.model?.buildingById.get(manager.id) : null;
  const enabled = manager.entity.enabled !== false;
  const fields = [`<label class="lssfo-field"><span>Name</span><input type="text" data-manager="name" maxlength="120" value="${esc(manager.name)}"></label>`];
  if (isVehicle && manager.maxInput) fields.push(`<label class="lssfo-field"><span>Maximale Besatzung</span><input type="number" data-manager="max" min="0" max="${analyzed?.staffMax || 99}" value="${esc(manager.maxPersonnel)}"><small>0 bedeutet: Standardwert des Fahrzeugtyps</small></label>`);
  if (!isVehicle && manager.dispatchInput) fields.push(`<label class="lssfo-field"><span>Leitstelle</span>${kit.selectHtml('data-manager="dispatch"', manager.dispatchOptions, manager.dispatchCenterId)}<small>Gespeichert wird über das originale Bearbeitungsformular des Spiels.</small></label>`);
  if (!isVehicle) {
    const saving = state.statusSaving === manager.id;
    fields.push(`<div class="lssfo-status-card"><span>Status der Wache</span>${enabled ? badge("aktiv", "ok") : badge("inaktiv", "warn")}<button type="button" class="lssfo-btn is-small" data-action="building-status" data-id="${manager.id}"${state.statusSaving !== null ? " disabled" : ""}>${saving ? "Bitte warten …" : enabled ? "Wache deaktivieren" : "Wache aktivieren"}</button><small>Inaktive Wachen berücksichtigt das Spiel bei der Einsatzgenerierung anders.</small></div>`);
  }
  const sections = [`<section class="lssfo-section">
      <div class="lssfo-heading"><div><h3>Stammdaten</h3><p>${isVehicle ? "Name und Fahrzeugeinstellungen" : "Name, Leitstelle und Status der Wache"}</p></div></div>
      <div class="lssfo-form-grid">${fields.join("")}</div>
      <div class="lssfo-actions is-start">
        <button type="button" class="lssfo-btn is-primary" data-action="manager-save"${manager.loading || manager.saving ? " disabled" : ""}>${manager.saving ? `${spinner()} Speichert …` : "Änderungen speichern"}</button>
        <a class="lssfo-btn" href="/${isVehicle ? "vehicles" : "buildings"}/${manager.id}/edit" target="_blank" rel="noopener">Alle Spieleinstellungen ${icon("external")}</a>
      </div>
    </section>`];

  if (building) {
    const extensions = state.model.extensions.filter((entry) => entry.buildingId === manager.id);
    const count = (status) => extensions.filter((entry) => entry.status === status).length;
    const chips = extensions.map((entry) => `<span class="lssfo-chip is-${entry.status}">${esc(entry.caption)} · ${esc(entry.status === "building" ? Core.relativeTime(entry.availableAt) : EXTENSION_LABELS[entry.status])}</span>`).join("") || '<span class="lssfo-muted">Keine Einträge</span>';
    sections.push(`<section class="lssfo-section"><div class="lssfo-heading"><div><h3>Ausbauten und Personal</h3><p>${extensions.length ? `${count("active")} aktiv · ${count("inactive")} inaktiv · ${count("building")} im Bau` : "Keine Ausbauinformationen vorhanden"}</p></div></div>
      <div class="lssfo-chips">${chips}</div>
      <div class="lssfo-actions is-start"><a class="lssfo-btn" href="/buildings/${manager.id}" target="_blank" rel="noopener">Wache öffnen</a><a class="lssfo-btn" href="/buildings/${manager.id}/personals" target="_blank" rel="noopener">Personal</a></div></section>`);
    const vehicles = building.vehicles.slice().sort((a, b) => Number(b.hasMissing) - Number(a.hasMissing) || collator.compare(a.caption, b.caption));
    const missing = vehicles.filter((vehicle) => vehicle.hasMissing).length;
    const list = vehicles.map((vehicle) => {
      const status = vehicle.missingCrew > 0 ? `${vehicle.missingCrew} Besatzung fehlt` : vehicle.missingTraining > 0 ? `${vehicle.missingTraining} Ausbildung fehlt` : "vollständig";
      return `<article class="${vehicle.hasMissing ? "has-missing" : "is-complete"}"><div>${gameLink(`/vehicles/${vehicle.id}/zuweisung`, vehicle.caption)}<span>${esc(vehicle.typeCaption)} · ${vehicle.assigned}/${vehicle.target} Personen</span></div><div><b>${esc(status)}</b><button type="button" class="lssfo-btn is-small" data-action="manage-vehicle" data-id="${vehicle.id}">Besatzung ändern</button></div></article>`;
    }).join("");
    sections.push(`<section class="lssfo-section"><div class="lssfo-heading"><div><h3>Fahrzeuge dieser Wache</h3><p>${plural(vehicles.length, "Fahrzeug", "Fahrzeuge")} stationiert · ${missing ? `${missing} mit Fehlbedarf` : "alle vollständig"}</p></div></div>
      ${list ? `<div class="lssfo-station-vehicles">${list}</div>` : '<div class="lssfo-empty is-small">Keine Fahrzeuge an dieser Wache gefunden.</div>'}</section>`);
  }

  if (isVehicle) {
    const capacity = Core.targetCrew(manager.entity, state.data.vehicleTypes[String(manager.entity.vehicle_type)], "max");
    const assigned = manager.personnel.filter((person) => person.assigned).length;
    sections.push(`<section class="lssfo-section">
      <div class="lssfo-heading"><div><h3>Mannschaft zuweisen</h3><p>${assigned} von ${capacity} Personen zugewiesen · Zugewiesene stehen zuerst</p></div>
        <label class="lssfo-search lssfo-person-search">${icon("search")}<input type="search" data-input="manager-search" value="${esc(manager.personQuery)}" placeholder="Name oder Ausbildung suchen …" aria-label="Personal durchsuchen"></label></div>
      ${manager.loading ? `<div class="lssfo-empty is-small">${spinner()} Personal wird geladen …</div>` : personnelTableHtml(analyzed?.training.map((item) => item.key) || [], capacity)}
    </section>`);
  }

  manager.dialog.render(`${kit.dialogHead({ kicker: isVehicle ? "Fahrzeugverwaltung" : "Wachenverwaltung", title: manager.name, glyph: kit.glyph(isVehicle ? "#007aff" : "#ff9500", isVehicle ? "vehicle" : "building") })}
    <div class="lssfo-dialog-body">
      ${manager.error ? note("error", esc(manager.error)) : ""}
      ${manager.notice ? note("success", esc(manager.notice)) : ""}
      ${sections.join("")}
    </div>`);
  const newBody = manager.dialog.element.querySelector(".lssfo-dialog-body");
  if (newBody && scrollTop) newBody.scrollTop = scrollTop;
}

async function submitDirectRename(target, name) {
  if (target.kind !== "building") throw new Error("Das Bearbeitungsformular des Fahrzeugs wurde nicht erkannt.");
  const csrf = kit.csrfToken();
  if (!csrf) throw new Error("Sicherheitsschlüssel der Spielseite wurde nicht gefunden.");
  await kit.post(`/buildings/${target.id}`, { csrf, body: new URLSearchParams({ utf8: "✓", _method: "put", authenticity_token: csrf, "building[name]": name }) });
}

async function saveManager() {
  const current = manager;
  if (!current || current.saving) return;
  const element = current.dialog.element;
  const value = (field) => element.querySelector(`[data-manager="${field}"]`)?.value;
  const name = String(value("name") || "").trim();
  if (!name) {
    current.error = "Der Name darf nicht leer sein.";
    renderManager();
    return;
  }
  const max = current.maxInput ? value("max") ?? current.maxPersonnel : "";
  const dispatch = current.dispatchInput ? value("dispatch") ?? current.dispatchCenterId : "";
  Object.assign(current, { name, maxPersonnel: max, dispatchCenterId: dispatch, error: "", notice: "", saving: true });
  renderManager();
  try {
    if (current.form) {
      current.nameInput.value = name;
      if (current.maxInput) current.maxInput.value = max;
      if (current.dispatchInput) current.dispatchInput.value = dispatch;
      await kit.submitForm(current.form);
    } else {
      await submitDirectRename(current, name);
    }
    current.entity.caption = name;
    if (current.kind === "building" && current.dispatchInput) current.entity.leitstelle_building_id = dispatch ? Number(dispatch) : null;
    if (current.kind === "vehicle" && current.maxInput) current.entity.max_personnel_override = Number(max) > 0 ? Number(max) : null;
    analyze();
    render();
    saveData();
    current.notice = "Änderungen wurden gespeichert.";
  } catch (error) {
    current.error = `Speichern fehlgeschlagen: ${error.message}`;
  } finally {
    current.saving = false;
    if (manager === current) renderManager();
  }
}

// Das Spiel schaltet den Status über einen GET-Link um – deshalb ohne automatische Wiederholung.
async function toggleBuildingStatus(id) {
  const building = rawBuilding(id);
  if (!building || state.statusSaving !== null) return;
  const forManager = manager?.kind === "building" && manager.id === id;
  const wasEnabled = building.enabled !== false;
  state.statusSaving = id;
  state.error = "";
  if (forManager) Object.assign(manager, { error: "", notice: "" });
  refreshStatusViews();
  try {
    await kit.request(`/buildings/${id}/active`, { headers: { "X-Requested-With": "XMLHttpRequest" }, priority: true, retries: 0 });
    building.enabled = !wasEnabled;
    analyze();
    saveData();
    if (forManager) manager.notice = `Die Wache wurde ${building.enabled ? "aktiviert" : "deaktiviert"}.`;
  } catch (error) {
    const message = `Statusänderung fehlgeschlagen: ${error.message}`;
    if (forManager) manager.error = message;
    else state.error = message;
  } finally {
    state.statusSaving = null;
    refreshStatusViews();
  }
}

function refreshStatusViews() {
  if (state.open) render();
  if (manager) renderManager();
}

async function togglePersonnel(personId) {
  const current = manager;
  const person = current?.personnel.find((entry) => entry.id === personId);
  if (!current || !person?.actionHref || current.savingPerson !== null) return;
  Object.assign(current, { savingPerson: personId, error: "", notice: "" });
  renderManager();
  try {
    await kit.post(person.actionHref, { csrf: current.csrf });
    // Von einem anderen Fahrzeug abgezogen: dessen Zahlen gleich mit anpassen.
    const previous = person.boundTo?.id ? state.scans.vehicles[String(person.boundTo.id)] : null;
    if (previous && !person.assigned) {
      previous.assignedRows = Math.max(0, (previous.assignedRows || 0) - 1);
      for (const key of person.keys) previous.counts[key] = Math.max(0, (previous.counts[key] || 0) - 1);
    }
    if (person.boundTo?.id && !person.assigned) {
      const source = rawVehicle(person.boundTo.id);
      if (source) source.assigned_personnel_count = Math.max(0, Number(source.assigned_personnel_count || 0) - 1);
    }
    parsePersonnelPage(await kit.getHtml(`/vehicles/${current.id}/zuweisung`, { priority: true }), current);
    const assigned = current.personnel.filter((entry) => entry.assigned);
    current.entity.assigned_personnel_count = assigned.length;
    const counts = {};
    for (const entry of assigned) for (const key of entry.keys) counts[key] = (counts[key] || 0) + 1;
    state.scans.vehicles[String(current.id)] = { counts, assignedRows: assigned.length, scannedAt: Date.now() };
    analyze();
    if (state.open) render();
    saveData();
    current.notice = person.assigned ? `${person.name} wurde vom Fahrzeug entfernt.` : `${person.name} wurde dem Fahrzeug zugewiesen.`;
  } catch (error) {
    current.error = `Personaländerung fehlgeschlagen: ${error.message}`;
  } finally {
    current.savingPerson = null;
    if (manager === current) renderManager();
  }
}

/* ---------- Spielseiten im Panel ---------- */

const hasGameLightbox = () => typeof kit.pageWindow.lightboxOpen === "function";
let lightboxWatch = 0;

// Die Lightbox des Spiels zeigt Wachen-, Personal- und Fahrzeugseiten zuverlässig an
// (genau so öffnet sie das Spiel selbst). Sie liegt dann über dem Panel.
function openGameLightbox(url) {
  if (!hasGameLightbox()) return false;
  try {
    document.documentElement.classList.add("lssfo-lightbox-front");
    kit.pageWindow.lightboxOpen(url);
  } catch {
    document.documentElement.classList.remove("lssfo-lightbox-front");
    return false;
  }
  clearInterval(lightboxWatch);
  lightboxWatch = setInterval(() => {
    const box = document.getElementById("lightbox_box");
    if (box && box.style.display !== "none" && !box.hidden) return;
    clearInterval(lightboxWatch);
    document.documentElement.classList.remove("lssfo-lightbox-front");
    afterGameView(url);
  }, 500);
  return true;
}

// Ohne Lightbox: Spielseite in einem eingebetteten Fenster mit Zurück und Neu laden.
function openGameView(url, title) {
  if (openGameLightbox(url)) return;
  const kind = /\/personals/.test(url) ? "Personal" : /^\/vehicles\//.test(url) ? "Fahrzeug" : "Wache";
  const dialog = kit.openDialog({ label: title || "Spielseite", size: "full", className: "lssfo-game-view", onClose: () => afterGameView(url) });
  const tools = `<button type="button" class="lssfo-icon-btn" data-action="frame-back" aria-label="Zurück" title="Zurück">${icon("back")}</button><button type="button" class="lssfo-icon-btn" data-action="frame-reload" aria-label="Neu laden" title="Neu laden">${icon("refresh")}</button>`;
  dialog.render(`${kit.dialogHead({ kicker: `${kind} · im Spiel`, title: title || "Spielseite", tools })}<div class="lssfo-frame-wrap"><iframe src="${esc(url)}" title="${esc(title || "Spielseite")}"></iframe></div>`);
  watchFrame(dialog.element.querySelector("iframe"), "Diese Seite lässt sich nicht im Panel anzeigen. Mit Strg-Klick auf den Link öffnet sie sich in einem neuen Tab.");
}

function watchFrame(frame, message) {
  frame?.addEventListener("load", () => setTimeout(() => {
    try {
      if ((frame.contentDocument?.body?.innerText?.trim() || "").length >= 20) return;
    } catch { /* Fremdinhalt: Hinweis zeigen. */ }
    const wrap = frame.parentElement;
    if (wrap && !wrap.querySelector(".lssfo-frame-warning")) wrap.insertAdjacentHTML("afterbegin", `<div class="lssfo-frame-warning">${note("warn", esc(message))}</div>`);
  }, 700), { once: true });
}

// Nach dem Schließen einer Wachenseite: deren Personalliste neu lesen (eine Anfrage).
function afterGameView(url) {
  const id = Number(String(url || "").match(/^\/buildings\/(\d+)/)?.[1]);
  if (id && state.model) void refreshBuildingAssignments(id);
}

async function refreshBuildingAssignments(id) {
  try {
    const scan = parseBuildingAssignments(await kit.getHtml(`/buildings/${id}/personals`, { priority: true }));
    state.scans.stations[String(id)] = scan.station;
    for (const vehicle of state.model.vehicles.filter((entry) => entry.buildingId === id)) {
      if (!state.scans.vehicles[String(vehicle.id)] && !scan.vehicles.has(vehicle.id)) continue;
      state.scans.vehicles[String(vehicle.id)] = scan.vehicles.get(vehicle.id) || { counts: {}, assignedRows: 0, scannedAt: Date.now() };
    }
    analyze();
    if (state.open) renderContent();
  } catch { /* Übernommen wird beim nächsten Aktualisieren. */ }
}

/* ---------- Lehrgänge starten ---------- */

function openCourseAssistant() {
  const schools = state.model.buildings.filter((building) => building.isSchool).sort((a, b) => collator.compare(a.caption, b.caption));
  // Eine einzige Schule: direkt im Spiel öffnen.
  if (schools.length === 1 && openGameLightbox(`/buildings/${schools[0].id}`)) return;
  const assistant = { schools, schoolId: schools[0]?.id || null };
  assistant.dialog = kit.openDialog({ label: "Lehrgang starten", size: schools.length && !hasGameLightbox() ? "full" : "md", className: "lssfo-course" });
  courseAssistant = assistant;
  renderCourseAssistant();
}

let courseAssistant = null;

function renderCourseAssistant() {
  const assistant = courseAssistant;
  if (!assistant?.dialog.isOpen) return;
  const url = assistant.schoolId ? `/buildings/${assistant.schoolId}#schooling` : "";
  const options = assistant.schools.length ? assistant.schools.map((school) => ({ value: String(school.id), label: school.caption })) : [{ value: "", label: "Keine eigene Schule erkannt" }];
  const embedded = url && !hasGameLightbox();
  assistant.dialog.render(`${kit.dialogHead({ kicker: "Lehrgänge", title: "Lehrgang starten", glyph: kit.glyph("#ff2d55", "calendar") })}
    <div class="lssfo-course-controls">
      <label class="lssfo-field"><span>Ausbildungsstätte</span>${kit.selectHtml('data-change="course-school"', options, String(assistant.schoolId || ""))}</label>
      ${url ? `<a class="lssfo-btn" href="${url}" target="_blank" rel="noopener">In neuem Tab öffnen ${icon("external")}</a>` : ""}
      <p>Lehrgang im Schulungsbereich anlegen und Personal aus verschiedenen Wachen auswählen. Gebucht wird erst über die Schaltflächen des Spiels.</p>
    </div>
    ${!url ? '<div class="lssfo-dialog-body"><div class="lssfo-empty">Es wurde keine Ausbildungsstätte erkannt. Prüfe, ob deine Daten über „Aktualisieren“ geladen wurden.</div></div>'
      : embedded ? `<div class="lssfo-frame-wrap"><iframe src="${url}" title="Schulungsbereich"></iframe></div>`
        : `<div class="lssfo-dialog-body"><div class="lssfo-actions is-start"><button type="button" class="lssfo-btn is-primary" data-action="course-open-school">Lehrgangsbereich öffnen</button><span class="lssfo-muted">Öffnet die Ausbildungsstätte im Spiel – dort Lehrgang wählen und Personal aus allen Wachen auswählen.</span></div></div>`}`);
  const frame = assistant.dialog.element.querySelector("iframe");
  frame?.addEventListener("load", () => {
    try { frame.contentDocument?.querySelector('a[href="#schooling"]')?.click(); } catch { /* Die Seite bleibt bedienbar. */ }
  });
  watchFrame(frame, "Der Schulungsbereich lässt sich im Panel nicht anzeigen. Öffne die Ausbildungsstätte oben in einem neuen Tab.");
}

kit.on({
  click: {
    "manage-vehicle": (element) => void openManager("vehicle", Number(element.dataset.id)),
    "manage-building": (element) => void openManager("building", Number(element.dataset.id)),
    "manager-save": () => void saveManager(),
    "building-status": (element) => void toggleBuildingStatus(Number(element.dataset.id)),
    "person-toggle": (element) => void togglePersonnel(Number(element.dataset.id)),
    "frame-back": (element) => {
      try { element.closest(".lssfo-dialog")?.querySelector("iframe")?.contentWindow?.history.back(); } catch { /* Verlauf nicht verfügbar. */ }
    },
    "frame-reload": (element) => {
      try { element.closest(".lssfo-dialog")?.querySelector("iframe")?.contentWindow?.location.reload(); } catch { /* Neu laden nicht möglich. */ }
    },
    "course-open": openCourseAssistant,
    "course-open-school": () => {
      const id = courseAssistant?.schoolId;
      if (!id) return;
      courseAssistant.dialog.close();
      openGameLightbox(`/buildings/${id}`);
    },
  },
  change: {
    "course-school": (element) => {
      if (!courseAssistant) return;
      courseAssistant.schoolId = Number(element.value) || null;
      renderCourseAssistant();
    },
  },
  input: {
    "manager-search": (element) => {
      if (!manager) return;
      manager.personQuery = element.value.trim().toLocaleLowerCase("de");
      for (const row of manager.dialog.element.querySelectorAll("[data-person-search]")) row.hidden = Boolean(manager.personQuery) && !row.dataset.personSearch.includes(manager.personQuery);
    },
  },
});

// ---- lss_verwaltung/src/scans.js ----
/*
 * Prüfungen von Ausbildungen und Personal. Beide lesen dieselbe Quelle – die
 * Personalliste je Wache – und teilen sich die Ergebnisse: eine Anfrage pro Wache,
 * über die gemeinsame Warteschlange, abbrechbar. Wachen, die vor Kurzem geprüft
 * wurden, werden nicht erneut abgefragt.
 */

let scansValidSince = 0;

const SCAN_LABELS = { training: "Ausbildungen werden geprüft", personnel: "Personal wird geprüft" };

function scanTargets(kind) {
  const model = state.model;
  if (kind === "training") return [...new Set(model.vehicles.filter((vehicle) => vehicle.training.length).map((vehicle) => vehicle.buildingId))];
  return model.stations.filter((building) => building.vehicles.length || Number(building.personal_count || 0) > 0).map((building) => building.id);
}

const isFresh = (scan) => scan && scan.scannedAt > scansValidSince && Date.now() - scan.scannedAt < SCAN_FRESH;

async function runScan(kind) {
  if (state.scan) {
    if (state.scan.kind === kind) state.scan.controller.abort();
    return;
  }
  if (!state.model) return;
  const targets = scanTargets(kind);
  if (!targets.length) {
    state.error = kind === "training" ? "Es wurden keine Fahrzeuge mit Ausbildungsanforderung gefunden." : "Es wurden keine Wachen mit Personal gefunden.";
    render();
    return;
  }
  const controller = new AbortController();
  const scan = { kind, controller, done: 0, total: targets.length, label: "Start", skipped: 0 };
  state.scan = scan;
  state.error = "";
  render();
  const fallback = [];
  let failure = null;
  let sinceAnalyze = 0;
  const progress = (label) => {
    scan.label = label;
    renderStatus();
  };

  await Promise.allSettled(targets.map(async (id) => {
    const building = state.model.buildingById.get(id);
    if (isFresh(state.scans.stations[String(id)])) {
      scan.done += 1;
      scan.skipped += 1;
      return;
    }
    try {
      const result = parseBuildingAssignments(await kit.getHtml(`/buildings/${id}/personals`, { signal: controller.signal }));
      state.scans.stations[String(id)] = result.station;
      for (const vehicle of building?.vehicles || []) {
        const assigned = result.vehicles.get(vehicle.id);
        // Keine Fahrzeugspalte erkannt oder laut API doch jemand zugewiesen → Zuweisungsseite als Rückfall.
        if (!assigned && (!result.hasVehicleColumn || vehicle.assigned > 0)) {
          if (kind === "training" && vehicle.training.length) fallback.push(vehicle);
        } else {
          state.scans.vehicles[String(vehicle.id)] = assigned || { counts: {}, assignedRows: 0, scannedAt: Date.now() };
        }
      }
      scan.done += 1;
      sinceAnalyze += 1;
      if (sinceAnalyze >= 15) {
        sinceAnalyze = 0;
        analyze();
      }
      progress(building?.caption || `Wache ${id}`);
    } catch (error) {
      if (kit.isAbort(error)) return;
      failure ||= `${error.message}${building ? ` bei ${building.caption}` : ""}`;
      controller.abort();
    }
  }));

  try {
    for (let index = 0; index < fallback.length && !controller.signal.aborted; index += 1) {
      const vehicle = fallback[index];
      scan.label = `Einzelprüfung ${index + 1} / ${fallback.length} · ${vehicle.caption}`;
      renderStatus();
      state.scans.vehicles[String(vehicle.id)] = parseAssignedEducations(await kit.getHtml(`/vehicles/${vehicle.id}/zuweisung`, { signal: controller.signal }), vehicle.id);
    }
  } catch (error) {
    if (!kit.isAbort(error)) failure ||= error.message;
  }

  if (failure) state.error = `Prüfung abgebrochen: ${failure}`;
  else if (!controller.signal.aborted) {
    if (kind === "training") state.tab = "training";
    if (scan.skipped) kit.toast(`${plural(scan.skipped, "Wache war", "Wachen waren")} vor Kurzem geprüft und wurde${scan.skipped === 1 ? "" : "n"} übersprungen.`);
  }
  state.scan = null;
  analyze();
  render();
}

function scanStatusText() {
  const scan = state.scan;
  return scan ? `${SCAN_LABELS[scan.kind]}: ${formatNumber(scan.done)} / ${formatNumber(scan.total)} Wachen · ${scan.label}` : "";
}

/* ---------- Auswertung der Spielseiten ---------- */

// Personalliste einer Wache: Bestand, Verfügbarkeit, Ausbildungen und Namen je Ausbildung.
function parseStationPersonnel(doc) {
  const rows = [...doc.querySelectorAll("#personal_table tbody tr, tbody tr[data-filterable-by]")];
  const counts = {};
  const names = {};
  let available = 0;
  let inTraining = 0;
  let withoutEducation = 0;
  for (const row of new Set(rows)) {
    const keys = educationKeys(row);
    const cells = row.querySelectorAll("td");
    const name = kit.textOf(cells[1]) || kit.textOf(cells[0]) || "Unbekannt";
    const status = [...cells].map(kit.textOf).join(" ");
    if (/unterricht|lehrgang/i.test(status)) inTraining += 1;
    else if (/verfügbar|available/i.test(status)) available += 1;
    if (!keys.length) withoutEducation += 1;
    for (const key of keys) {
      counts[key] = (counts[key] || 0) + 1;
      (names[key] ||= []).push(name);
    }
  }
  return { counts, names, total: new Set(rows).size, available, inTraining, withoutEducation, scannedAt: Date.now() };
}

// Dieselbe Seite liefert je gebundenem Fahrzeug die zugewiesenen Ausbildungen.
function parseBuildingAssignments(html) {
  const doc = kit.parseHtml(html);
  const vehicles = new Map();
  let hasVehicleColumn = false;
  for (const row of new Set(doc.querySelectorAll("#personal_table tbody tr, tbody tr[data-filterable-by]"))) {
    const link = [...row.querySelectorAll('a[href*="/vehicles/"]')]
      .map((anchor) => (anchor.getAttribute("href") || "").match(/\/vehicles\/(\d+)\/?$/))
      .find(Boolean);
    if (!link) continue;
    hasVehicleColumn = true;
    const id = Number(link[1]);
    let entry = vehicles.get(id);
    if (!entry) {
      entry = { counts: {}, assignedRows: 0, scannedAt: Date.now() };
      vehicles.set(id, entry);
    }
    entry.assignedRows += 1;
    for (const key of educationKeys(row)) entry.counts[key] = (entry.counts[key] || 0) + 1;
  }
  // Eine Spalte „Gebunden an“ gibt es auch, wenn gerade niemand gebunden ist (Überschrift).
  if (!hasVehicleColumn) hasVehicleColumn = [...doc.querySelectorAll("#personal_table thead th, thead th")].some((cell) => /gebunden|fahrzeug/i.test(cell.textContent || ""));
  return { station: parseStationPersonnel(doc), vehicles, hasVehicleColumn };
}

// Rückfall: Zuweisungsseite eines einzelnen Fahrzeugs.
function parseAssignedEducations(html, vehicleId) {
  const rows = [...kit.parseHtml(html).querySelectorAll("tbody tr")].filter((row) => {
    if (row.querySelector("a.btn-assigned")) return true;
    const href = row.querySelector('td:nth-child(3) a[href*="/vehicles/"]')?.getAttribute("href") || "";
    return new RegExp(`/vehicles/${vehicleId}/?$`).test(href);
  });
  const counts = {};
  for (const row of rows) for (const key of educationKeys(row)) counts[key] = (counts[key] || 0) + 1;
  return { counts, assignedRows: rows.length, scannedAt: Date.now() };
}

kit.on({
  click: {
    scan: () => void runScan("training"),
    "scan-personnel": () => void runScan("personnel"),
  },
});

// ---- lss_verwaltung/src/shell.js ----
/*
 * Hauptfenster: Kopf, Kennzahlen, Bereiche, Werkzeugleiste und Inhalt.
 * Wird erst beim ersten Öffnen aufgebaut; geschlossen kostet es nichts.
 */

let shell = null;
let closeTimer = 0;
let searchTimer = 0;

const THEMES = [{ value: "auto", label: "LSS-Design" }, { value: "dark", label: "Dunkel" }, { value: "light", label: "Hell" }];
const EFFECTS = [{ value: "auto", label: "Effekte: Auto" }, { value: "full", label: "Effekte: Voll" }, { value: "reduced", label: "Effekte: Sparsam" }];
const CREW_MODES = [{ value: "max", label: "Maximal" }, { value: "min", label: "Minimum" }];

// Markenzeichen (gefüllte Kacheln) – gleich in Navigationsleiste und Fensterkopf.
const brandGlyph = (className = "") => `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="currentColor"><rect x="3" y="3" width="8" height="10" rx="2"/><rect x="13" y="3" width="8" height="6" rx="2"/><rect x="13" y="11" width="8" height="10" rx="2"/><rect x="3" y="15" width="8" height="6" rx="2"/></svg>`;
const ref = (name) => shell.querySelector(`[data-ref="${name}"]`);

function ensureShell() {
  if (shell) return;
  shell = kit.createRoot("lssfo-shell", "lssfo-shell");
  shell.hidden = true;
  shell.innerHTML = `
    <div class="lssfo-shell-backdrop" data-action="close"></div>
    <section class="lssfo-window" role="dialog" aria-modal="true" aria-label="LSS Verwaltung">
      <header class="lssfo-header">
        <div class="lssfo-brand"><span class="lssfo-brand-mark">${brandGlyph("lssfo-brand-glyph")}</span><div><h1>LSS Verwaltung</h1><p data-ref="subtitle">Noch keine Daten geladen</p></div></div>
        <div class="lssfo-header-actions">
          <label class="lssfo-pick" title="Darstellung">${icon("theme")}${kit.selectHtml('data-change="theme" aria-label="Darstellung"', THEMES, settings.values.theme)}</label>
          <label class="lssfo-pick" title="Glas-Unschärfe und Animationen. „Sparsam“ entlastet schwächere Rechner.">${icon("gauge")}${kit.selectHtml('data-change="effects" aria-label="Effekte"', EFFECTS, settings.values.effects)}</label>
          ${STANDALONE ? "" : `<button type="button" class="lssfo-btn lssfo-collapse" data-action="popout">${icon("external")}<span>Eigenes Fenster</span></button>`}
          <button type="button" class="lssfo-btn is-primary lssfo-collapse" data-action="refresh">${icon("refresh")}<span>Aktualisieren</span></button>
          <button type="button" class="lssfo-icon-btn" data-action="close" aria-label="Schließen" title="Schließen (Esc)">${icon("close")}</button>
        </div>
      </header>
      <div class="lssfo-status" data-ref="status"></div>
      <div class="lssfo-kpis" data-ref="kpis"></div>
      <nav class="lssfo-tabs" data-ref="tabs" aria-label="Bereiche">
        <span class="lssfo-tab-indicator" aria-hidden="true"></span>
        ${VIEWS.map((view) => `<button type="button" data-action="tab" data-tab="${view.id}">${icon(view.icon)}<span>${esc(view.label)}</span><b data-tab-count="${view.id}">0</b></button>`).join("")}
      </nav>
      <div class="lssfo-toolbar">
        <label class="lssfo-search">${icon("search")}<input type="search" data-input="search" placeholder="Fahrzeug, Wache oder Typ suchen …" aria-label="Übersicht durchsuchen"></label>
        <label class="lssfo-toggle"><input class="lssfo-switch" type="checkbox" data-change="only-missing"><span>Nur Fehlbedarf</span></label>
        <label class="lssfo-toggle">Soll-Besatzung ${kit.selectHtml('class="lssfo-input lssfo-compact" data-change="crew-mode" aria-label="Soll-Besatzung"', CREW_MODES, settings.values.crewMode)}</label>
        <button type="button" class="lssfo-btn" data-action="scan" data-ref="scan"></button>
        <button type="button" class="lssfo-btn" data-action="export">${icon("download")}<span>CSV exportieren</span></button>
      </div>
      <main class="lssfo-content" data-ref="content"></main>
      <footer class="lssfo-footer"><span>Auswertung lokal im Browser · Anfragen an das Spiel werden gedrosselt</span><span>Fahrzeuganforderungen: LSS-Manager-Katalog</span></footer>
    </section>`;
  // Links auf Spielseiten öffnen sich im Panel (Strg-/Mittelklick weiterhin in einem neuen Tab).
  shell.addEventListener("click", interceptGameLink);
  kit.layer().addEventListener("click", interceptGameLink);
  window.addEventListener("resize", () => state.open && positionTabIndicator());
}

function interceptGameLink(event) {
  const link = event.target.closest?.('a[href^="/buildings/"], a[href^="/vehicles/"]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  openGameView(link.getAttribute("href"), kit.textOf(link));
}

function openDashboard() {
  ensureShell();
  clearTimeout(closeTimer);
  if (!state.open) {
    state.open = true;
    kit.activate();
  }
  shell.hidden = false;
  shell.classList.remove("is-closing");
  document.documentElement.classList.add("lssfo-open");
  render();
  animateContent();
  if (!state.data.vehicles.length) void loadData(false);
}

function closeDashboard() {
  if (STANDALONE) {
    window.close();
    return;
  }
  if (!state.open) return;
  state.open = false;
  kit.deactivate();
  shell.classList.add("is-closing");
  document.documentElement.classList.remove("lssfo-open");
  closeTimer = setTimeout(() => {
    if (state.open) return;
    destroyOverviewMap();
    shell.hidden = true;
    shell.classList.remove("is-closing");
  }, 220);
}

function handleEscape() {
  if (!state.open) return false;
  closeDashboard();
  return true;
}

function render() {
  if (!shell || !state.open) return;
  renderStatus();
  renderKpis();
  renderTabs();
  ref("subtitle").textContent = state.data.updatedAt
    ? `Stand ${formatDateTime(state.data.updatedAt)} · ${settings.values.crewMode === "max" ? "Maximalbesatzung" : "Mindestbesatzung"}`
    : "Noch keine Daten geladen";
  ref("scan").innerHTML = state.scan?.kind === "training" ? `${icon("stop")}<span>Prüfung stoppen</span>` : `${icon("scan")}<span>Ausbildungen prüfen</span>`;
  ref("scan").disabled = Boolean(state.scan && state.scan.kind !== "training") || !state.model;
  shell.querySelector(".lssfo-window").classList.toggle("is-map", state.tab === "map");
  renderContent();
}

function renderStatus() {
  if (!shell) return;
  const busy = (text) => `<div class="lssfo-note">${spinner()}<span>${esc(text)}</span></div>`;
  ref("status").innerHTML = state.error ? note("error", esc(state.error))
    : state.scan ? busy(scanStatusText())
      : state.loading ? busy("Wachen, Fahrzeuge und Lehrgänge werden geladen …")
        : "";
}

function renderKpis() {
  const model = state.model;
  const vehicles = model?.vehicles || [];
  const missingCrew = vehicles.reduce((sum, vehicle) => sum + vehicle.missingCrew, 0);
  const affected = vehicles.filter((vehicle) => vehicle.hasMissing).length;
  const dispatchCount = model?.dispatchCenters.length || 0;
  const personnel = (model?.stations || []).reduce((sum, building) => sum + Number(building.personal_count || 0), 0);
  const kpi = (label, value, hint, iconName, danger = false) => `<article class="lssfo-kpi${danger ? " is-danger" : ""}"><div><i>${icon(iconName)}</i><span>${esc(label)}</span></div><strong>${esc(value)}</strong><small>${esc(hint)}</small></article>`;
  ref("kpis").innerHTML = [
    kpi("Fahrzeuge", formatNumber(vehicles.length), "im Fuhrpark", "vehicle"),
    kpi("Gebäude", formatNumber(state.data.buildings.length), `${formatNumber(Math.max(0, state.data.buildings.length - dispatchCount))} weitere · ${plural(dispatchCount, "Leitstelle", "Leitstellen")}`, "building"),
    kpi("Personal", formatNumber(personnel), "an personalführenden Wachen", "users"),
    kpi("Fehlende Besatzung", formatNumber(missingCrew), affected ? `${plural(affected, "Fahrzeug", "Fahrzeuge")} auffällig` : "alles vollständig", "alert", missingCrew > 0),
  ].join("");
}

function renderTabs() {
  const counts = state.model?.counts || {};
  for (const button of ref("tabs").querySelectorAll("[data-tab]")) button.classList.toggle("is-active", button.dataset.tab === state.tab);
  for (const view of VIEWS) {
    const counter = ref("tabs").querySelector(`[data-tab-count="${view.id}"]`);
    if (counter) counter.textContent = formatNumber(view.count ? view.count() : counts[view.id] || 0);
  }
  positionTabIndicator();
}

function positionTabIndicator() {
  const nav = ref("tabs");
  const active = nav.querySelector(`[data-tab="${state.tab}"]`);
  const indicator = nav.querySelector(".lssfo-tab-indicator");
  if (!active?.offsetWidth) return;
  indicator.style.width = `${active.offsetWidth}px`;
  indicator.style.transform = `translateX(${active.offsetLeft}px)`;
}

function renderContent() {
  if (!shell || !state.open) return;
  const content = ref("content");
  if (state.tab !== "map") destroyOverviewMap();
  if (!state.model) {
    content.innerHTML = `<div class="lssfo-empty">${state.loading ? `${spinner()} Daten werden vorbereitet …` : "Noch keine Daten – „Aktualisieren“ lädt Wachen, Fahrzeuge und Lehrgänge."}</div>`;
    return;
  }
  if (!Object.keys(state.data.vehicleTypes).length) {
    content.innerHTML = '<div class="lssfo-empty">Der Fahrzeugkatalog konnte nicht geladen werden. Bitte die Internetverbindung prüfen und erneut aktualisieren.</div>';
    return;
  }
  currentView().render(content);
}

// Einblenden nur beim Bereichswechsel, nicht bei jeder Suche.
function animateContent() {
  const content = ref("content");
  content.classList.remove("is-entering");
  requestAnimationFrame(() => content.classList.add("is-entering"));
}

function selectTab(tab) {
  if (!VIEWS.some((view) => view.id === tab)) return;
  const changed = tab !== state.tab;
  state.tab = tab;
  render();
  if (!changed) return;
  animateContent();
  requestAnimationFrame(() => ref("tabs").querySelector(`[data-tab="${tab}"]`)?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" }));
}

kit.on({
  click: {
    close: closeDashboard,
    tab: (element) => selectTab(element.dataset.tab),
    refresh: () => {
      scansValidSince = Date.now();
      void loadData(true);
    },
    popout: () => window.open(new URL("/?lssfo=dashboard", location.origin).href, "_blank", "noopener"),
    export: exportCsv,
  },
  change: {
    theme: (element) => {
      settings.set({ theme: element.value });
      kit.setAppearance({ theme: element.value });
      if (state.tab === "map") renderContent();
    },
    effects: (element) => {
      settings.set({ effects: element.value });
      kit.setAppearance({ effects: element.value });
    },
    "only-missing": (element) => {
      state.onlyMissing = element.checked;
      state.limits = {};
      renderContent();
    },
    "crew-mode": (element) => {
      settings.set({ crewMode: element.value });
      analyze();
      render();
    },
  },
  input: {
    // Große Tabellen werden erst neu aufgebaut, wenn kurz nicht mehr getippt wird.
    search: (element) => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        state.query = element.value.trim().toLocaleLowerCase("de");
        state.limits = {};
        renderContent();
      }, 180);
    },
  },
});

// ---- lss_verwaltung/src/main.js ----
/*
 * Start: Eintrag in der Navigationsleiste, eigenes Fenster (?lssfo=dashboard) und
 * Verbindung zur Wachenplaner-Webseite. Mehr passiert beim Laden einer Spielseite nicht.
 */

// Überbleibsel aus Version 1.0 (große Daten lagen damals im knappen localStorage).
try { localStorage.removeItem("lssfo-cache-v2"); } catch { /* Speicher kann gesperrt sein. */ }

kit.mountLauncher({ id: "lssfo-launcher", title: "LSS Verwaltung öffnen", label: "LSS Verwaltung", glyph: brandGlyph(), onClick: openDashboard });

if (STANDALONE) {
  document.documentElement.classList.add("lssfo-standalone");
  setTimeout(openDashboard, 0);
}

kit.startBridge({
  sessionKey: "lssfo-planner",
  consentKey: "lssfo-planner-consent",
  pill: "Wachenplaner verbunden",
  kicker: "Wachenplaner",
  consentText: "Der Wachenplaner möchte deine Gebäude abgleichen, um anzuzeigen, welche echten Standorte du noch nicht gebaut hast. Übertragen werden nur <b>Name, Typ und Position</b> deiner Gebäude – an den Tab, der dieses Fenster geöffnet hat.",
});

// Über den Bau-Dialog neu gebaute Wachen sofort übernehmen.
kit.build.onBuilt((building) => {
  if (!state.data.buildings.length) return;
  state.data.buildings.push(building);
  analyze();
  render();
  saveData();
});
})();
