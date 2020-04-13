import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
model = tf.keras.models.load_model('model.h5')
# new_model = tf.keras.models.load_model('/Users/oskilla/Documents/GitHub/yaaaahoo-finance/ui/src/components/Analysis/content/model')
model.summary()
preds = model.predict(np.random.rand(1, 200, 12))
print(preds)
plt.plot(preds[0], [i for i in range(len(preds[0]))])
plt.show()