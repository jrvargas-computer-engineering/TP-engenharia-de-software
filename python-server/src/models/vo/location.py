class Location:
    def __init__(self, city, state, country):
        self.city = city
        self.state = state
        self.country = country

    def __str__(self):
        return f"Location(city={self.city}, state={self.state}, country={self.country})"
    
    

