package aws

import (
	"bytes"
	"sync"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

// ...

var lock = &sync.Mutex{}

var sess *session.Session

func getInstance() *session.Session {
	if sess == nil {
		lock.Lock()
		defer lock.Unlock()
		if sess == nil {
			sess = session.Must(session.NewSessionWithOptions(session.Options{
				SharedConfigState: session.SharedConfigEnable,
			}))
		}
	}

	return sess
}

func SaveFile(buf *bytes.Buffer) (*s3manager.UploadOutput, error) {
	var localSess = getInstance()
	uploader := s3manager.NewUploader(localSess)

	result, err := uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String("vtt-dev"),
		Key:    aws.String("bm-testing/newFile.png"),
		Body:   buf,
	})

	if err != nil {
		return &s3manager.UploadOutput{}, err
	}

	return result, nil
}
