#### GH Pages Preview Link here [ https://iulial.github.io/vending-machine-ReactJS ]
### Project Review

Why did I chose the frameworks and libraries I did?

Stack :
   - ReactJs because this vending machine app is a great React exercise
   - Browserify for making use of node modularity on the client-side and bundle those together
   - watchify - development watcher that observes changes and rebundles the modules when something changed
   - small static server with Express to have my front-end served easily

What functionality did I focus on? What did I omit?

The vending machine flow:
First the user is asked to select a product, he gets the price displayed, then he needs to insert cash relying 
on just coins (50 cents, 1 EUR and 2 EUR available). When the inserted cash is sufficient for the desired product the machine
automatically proceeds to payment and product delivery. The change is kept for the next transaction, and the machine stock 
is updated so if the prouduct is demanded again and again it will soon get out of stock, depending on the quantity in my mock
data, of course.
I did not implement the posibility to cash out the change.
Also when the machine has nothing left to sell the status is still 'Select product'.
I focused on the main actions.



