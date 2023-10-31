package aws

import (
	"bytes"
	"net/url"
	_ "net/url"
	"strings"
	"sync"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

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

func GetSignedFileUrl(objUrl string) (string, error) {
	var localSess = getInstance()
	serviceClient := s3.New(localSess)

	urlSlice := strings.Split(objUrl, "/")

	var bucket, _ = url.QueryUnescape(urlSlice[len(urlSlice)-2])

	var file, _ = url.QueryUnescape(urlSlice[len(urlSlice)-1])

	objKey := bucket + "/" + file

	req, _ := serviceClient.GetObjectRequest(&s3.GetObjectInput{
		Bucket: aws.String("vtt-dev"),
		Key:    aws.String(objKey),
	})

	urlStr, err := req.Presign(3 * time.Hour)

	if err != nil {
		return "", err
	}

	return urlStr, nil

}

func SaveFile(buf *bytes.Buffer, fileName string) (*s3manager.UploadOutput, error) {
	var localSess = getInstance()
	uploader := s3manager.NewUploader(localSess)

	result, err := uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String("vtt-dev"),
		Key:    aws.String("bm-testing/" + fileName),
		Body:   buf,
	})

	if err != nil {
		return &s3manager.UploadOutput{}, err
	}

	return result, nil
}
