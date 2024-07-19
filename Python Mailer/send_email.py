import os
import smtplib
from email.message import EmailMessage
from email.utils import formataddr
from pathlib import Path
from email.mime.image import MIMEImage

from dotenv import load_dotenv  # pip install python-dotenv

PORT = 587  
EMAIL_SERVER = "smtp.gmail.com"  # Adjust server address, if you are not using @outlook

# Load the environment variables
# current_dir = Path(__file__).resolve().parent if "__file__" in locals() else Path.cwd()
# envars = current_dir / ".env"
# load_dotenv(envars)

# Read environment variables
# sender_email = os.getenv("EMAIL")
# password_email = os.getenv("PASSWORD")

# sender_email ="conradhutchinson375@gmail.com"
# password_email ="phnw xiou giro iuyp"

sender_email ="im.ashar69@gmail.com"
password_email ="nprd jtkm igds kjld"


def send_email(subject, receiver_email, name, due_date, invoice_no, amount):
    # Create the base text message.
    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = formataddr(("Norton Security", f"{sender_email}"))
    msg["To"] = receiver_email
    msg["BCC"] = sender_email

    msg.set_content(
        f"""\
        Hi {name},
        I hope you are well.  
        I just wanted to drop you a quick note to remind you that {amount} USD in respect of our invoice {invoice_no} is due for payment on {due_date}.
        I would be really grateful if you could confirm that everything is on track for payment.
        Best regards
        Microsoft Inc.
        """
    )
    # Add the html version.  This converts the message into a multipart/alternative
    # container, with the original text message as the first part and the new html
    # message as the second part.

#   Invoice Number: {invoice_no}<br>
#   Invoice Date: <strong>{due_date}</strong><br>
#   Amount Due: <strong>{amount} USD</strong><br>
# <p></p>


    msg.add_alternative(
        f"""\
    <html>
        
      <body style = "margin: 0; padding: 0; color:black">
        <div>

            <p>Invoice Date: <strong>{due_date}</strong><p><br>
            <p>Dear {name},<p>
            <p><strong>Thank you for using Norton Security Antivirus.<strong></p>
            <p>Your Subscription to Norton Anti-Virus has been activated today, and you have been charged ${amount}. This subscription will auto-renew according to selected plan. Please review your purchase summary in the attached invoice.</p>
            <br>
            <p>If you have any questions or concerns about this transaction. Contact us at,<br> <strong>Customer Support Number: <strong style = "color: blue">+1 (83) 2426 3444.</strong> within the next 24 hours.</strong></p>
            <br><br>
            <p>Please note that this mailbox is not monitored. Do not reply to this email.</p>
            <br>
            <p style = "text-align: center">©NortonSecurity</p>

        </div>
      </body>
    </html>
    """,
        subtype="html",
    )

    # Embedding Image in HTML 

    fp = open('Invoice.jpg', 'rb').read()
    img = MIMEImage(fp,'jpg', name = 'Invoice')
    msg.attach(img)



    # Specify the  ID according to the img src in the HTML part

    with smtplib.SMTP(EMAIL_SERVER, PORT) as server:
        server.starttls()
        server.login(sender_email, password_email)
        server.sendmail(sender_email, receiver_email, msg.as_string())



#-------Test Mail------#

if __name__ == "__main__":
    send_email(
        subject="Payment Successfull",
        name="Franky",
        receiver_email="dotata4156@kinsef.com",
        due_date="24, May 2024",
        invoice_no="SDG57GHF6699",
        amount="489.00",
    )
