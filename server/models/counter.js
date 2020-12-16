import mongoose from 'mongoose';

const CounterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    default: 0,
  },
});

CounterSchema.index({ _id: 1, seq: 1 }, { unique: true });

const counterModel = mongoose.model('Counter', CounterSchema);

const autoIncrementModelId = (modelName, doc, next) => {
  counterModel.findByIdAndUpdate(
    modelName,
    { $inc: { seq: 1 } },
    { new: true, upsert: true },
    (error, counter) => {
      if (error) return next(error);
      doc.id = counter.seq;
      next();
    },
  );
};

module.exports = autoIncrementModelId;
