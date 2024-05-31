from flask import Flask, jsonify, request
import pickle
# from backend.model import predict
import numpy as np
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
# C:\Krish Programming\React Programming\anxiety\backend\wb

with open('C:\\Krish Programming\\React Programming\\anxiety\\backend\\model2.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/getPrediction',methods=['POST'])
def get_data():
    try:
        data = (request.get_json()) 
        print(data)

        study_load = data['study_load']
        academic_performance = data['academic_performance']
        teacher_student_relationship = data['teacher_student_relationship']
        future_career_concerns = data['future_career_concerns']
        headache = data['headache']
        sleep_quality = data['sleep_quality']
        breathing_problem = data['breathing_problem']


        if data is None:
            return jsonify({'error': 'No data provided'}), 400

        a_data = [academic_performance,study_load,teacher_student_relationship,future_career_concerns,headache,sleep_quality,breathing_problem]

        a_shaped_data = np.array([academic_performance,study_load,teacher_student_relationship,future_career_concerns,headache,sleep_quality,breathing_problem]).reshape(1, -1)
        print()
        print(a_shaped_data)
        # Make a prediction
        prediction = model.predict(a_shaped_data)
        print(prediction)


        if prediction == 0:
            return jsonify({'result': 'Your Anxiety Level : None'})
        elif prediction == 1:
            return jsonify({'result': 'Your Anxiety Level : Moderate'})
        else:
            return jsonify({'result': 'Your Anxiety Level : Severe'})
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True)