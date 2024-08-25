// Prepare file upload
const formData = new FormData();
formData.append("file", file); // Include TeacherID with file upload

// Upload the file and associate it with the teacher
const upload = await axios.post("/uploadFile", formData);

const [file, setFile] = useState();

<Input
  type="file"
  name="email"
  label="Upload Profile Picture"
  variant="bordered"
  className="bg-transparent py-1 my-1"
  onChange={(e) => setFile(e.target.files[0])}
  endContent={
    <FontAwesomeIcon
      icon={faEnvelope}
      className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
    />
  }
/>;
