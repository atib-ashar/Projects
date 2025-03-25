from datetime import date  # core python module
import pandas as pd  # pip install pandas
#from deta import app
from send_email import send_email  # local python module


# Public GoogleSheets url - not secure!
# SHEET_ID = "GOOGLE SHEET ID"  # !!! CHANGE ME !!!
# SHEET_NAME = "Sheet1"  # !!! CHANGE ME !!!
URL = "Invoice.csv"


def load_df(url):
    parse_dates = ["due_date", "reminder_date"]
    df = pd.read_csv(url, parse_dates=parse_dates)
    return df


def query_data_and_send_emails(df):
    present = date.today()
    email_counter = 0
    for _, row in df.iterrows():
        if (present >= row["reminder_date"].date()) and (row["has_paid"] == "no"):
            send_email(
                subject=f'Payment Successful',
                receiver_email=row["email"],
                name=row["name"],
                due_date=row["due_date"].strftime("%d, %b %Y"),  # example: 11, Aug 2022
                invoice_no=row["invoice_no"],
                amount=row["amount"],
            )
            email_counter += 1
    return f"Total Emails Sent: {email_counter}"


#@app.lib.cron()
#def cron_job(event):


df = load_df(URL)
result = query_data_and_send_emails(df)
print(result)
