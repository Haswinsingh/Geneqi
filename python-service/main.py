import os
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI()

class UserData(BaseModel):
    age: int
    education: str
    income: int
    gender: str

class Scholarship(BaseModel):
    _id: str
    name: str
    description: str
    educationLevel: str
    incomeLimit: int
    gender: str
    ageMin: int
    ageMax: int

class FilterRequest(BaseModel):
    user_data: UserData
    scholarships: List[dict]

@app.post("/filter-scholarships")
async def filter_scholarships(request: FilterRequest):
    user = request.user_data
    filtered = []
    
    for s in request.scholarships:
        # Check Age
        if not (s['ageMin'] <= user.age <= s['ageMax']):
            continue
        
        # Check Education (Simplified: exact match or "Any")
        if s['educationLevel'] != "Any" and s['educationLevel'] != user.education:
            continue
            
        # Check Income
        if user.income > s['incomeLimit']:
            continue
            
        # Check Gender
        if s['gender'] != "All" and s['gender'] != user.gender:
            continue
            
        filtered.append(s)
        
    return filtered

class IntentRequest(BaseModel):
    text: str

@app.post("/detect-intent")
async def detect_intent(request: IntentRequest):
    text = request.text.lower()
    
    if "scholarship" in text or "money" in text or "study" in text:
        return {
            "intent": "scholarship",
            "message": "I can help you find scholarships. Please fill in your details.",
            "route": "/scholarships"
        }
    elif "harassment" in text or "help" in text or "protect" in text or "report" in text:
        return {
            "intent": "harassment",
            "message": "If you are facing harassment, you are not alone. I can guide you to legal support.",
            "route": "/harassment"
        }
    else:
        return {
            "intent": "fallback",
            "message": "I'm here to help with scholarships and harassment support. How can I assist you today?",
            "route": "/"
        }

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
