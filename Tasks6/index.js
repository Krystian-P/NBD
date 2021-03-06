const Riak = require('basho-riak-client');

const deleteRecord = (client, { bucket, key }, next) => {
  client.deleteValue({ bucket, key }, function (err, result) {
    if (err) throw new Error(err);
    console.log(`Record ${key} deleted successfuly`);

    next(result);
  });
};

const readRecord = (client, bucketName, key, next) => {
  client.fetchValue(
    { bucket: bucketName, key, convertToJs: true },
    (err, result) => {
      if (err) throw new Error(err);

      if (result.isNotFound === true) {
        console.log(`${key} not found in bucket ${bucketName}`);
      } else {
        const riakObject = result.values.shift();
        const object = riakObject.value;
        next(object, riakObject);
      }
    }
  );
};

const storeRecord = (client, bucketName, key, value, next) => {
  client.storeValue(
    {
      bucket: bucketName,
      key,
      value
    },
    (err, result) => {
      if (err) throw new Error(err);
      console.log(`Record ${key} stored successfuly`);
      next(result);
    }
  );
};

const updateRecord = (client, riakObject, value, next) => {
  riakObject.setValue(value);

  client.storeValue({ value: riakObject }, (err, result) => {
    if (err) throw new Error(err);
    console.log(`Record ${riakObject.key} updated successfuly`);
    next(result);
  });
};

const student = {
  name: 'Krystian',
  age: 25,
  sNumber: 's24555'
};

(async () => {
  const bucketName = 'students';

  const client = new Riak.Client(['localhost:8087']);

  storeRecord(client, bucketName, student.sNumber, student, () => {
    readRecord(client, bucketName, 's24555', (student, riakObject) => {
      console.log(student);
      updateRecord(
        client,
        riakObject,
        {
          name: 'Krystian2',
          age: 60,
          sNumber: 's24555'
        },
        () => {
          readRecord(client, bucketName, 's24555', student => {
            console.log(student);

            deleteRecord(client, { bucket: bucketName, key: 's24555' }, () => {
              readRecord(client, bucketName, 's24555');
            });
          });
        }
      );
    });
  });
})();
