import { useState } from "react";
import FileUpload from "../components/form/FileUpload";
import { fileToBase64 } from "../utils/fileutils";

interface Application {
  field1: string;
  field2: string;
  field3: string;
  amount: number;
  attachments: string[];
  comments: string;
  id: 0;
}

const ApplicationPage = () => {
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);

  const onFileChange = async (files: File[]) => {
    setAttachments([...files]);
  };

  const [formdata, setFormdata]: [Application, any] = useState({
    field1: "",
    field2: "",
    field3: "",
    amount: 0,
    attachments: [],
    comments: "",
    id: 0,
  });

  const submitform = async () => {
    setDisableSubmit(true);

    const application: Application = {
      field1: formdata.field1,
      field2: formdata.field2,
      field3: formdata.field3,
      amount: formdata.amount,
      attachments: await Promise.all(
        [...attachments].map(async (file) => await fileToBase64(file))
      ),
      comments: formdata.comments,
      id: 0,
    };

    alert("Soknad sendt inn!");
    setDisableSubmit(false);
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center pt-12 pb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Soknadsskjema
          </h1>
          <p className="text-online-blue-200">
            Sok om okonomisk stotte fra Online
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-online-blue-600/30 backdrop-blur-sm rounded-xl border border-online-blue-500/30 p-6 md:p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Beskrivelse</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Forklar hvem dere er og hva pengene skal brukes til
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-lg bg-white text-online-blue-900 placeholder-gray-400 focus:ring-2 focus:ring-online-orange focus:outline-none h-28 resize-none"
                onChange={(e) =>
                  setFormdata({ ...formdata, field1: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Hvordan gar midlene Onlinere til gode?
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-lg bg-white text-online-blue-900 placeholder-gray-400 focus:ring-2 focus:ring-online-orange focus:outline-none h-28 resize-none"
                onChange={(e) =>
                  setFormdata({ ...formdata, field2: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Aktivitetsplan
              </label>
              <textarea
                className="w-full px-4 py-3 rounded-lg bg-white text-online-blue-900 placeholder-gray-400 focus:ring-2 focus:ring-online-orange focus:outline-none h-28 resize-none"
                onChange={(e) =>
                  setFormdata({ ...formdata, field3: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Belop (kr)
              </label>
              <input
                type="text"
                placeholder="5000"
                className="w-full px-4 py-3 rounded-lg bg-white text-online-blue-900 placeholder-gray-400 focus:ring-2 focus:ring-online-orange focus:outline-none"
                onChange={(e) =>
                  setFormdata({ ...formdata, amount: parseInt(e.target.value) || 0 })
                }
              />
            </div>
          </div>

          {/* Attachments Section */}
          <div className="border-t border-online-blue-500/30 pt-6 mt-6">
            <h2 className="text-xl font-semibold text-white mb-2">Vedlegg</h2>
            <p className="text-online-blue-200 text-sm mb-4">
              Last opp eventuelle filer/bilder av budsjett eller annet
            </p>
            <FileUpload files={attachments} onFileChange={onFileChange} />
          </div>

          {/* Comments Section */}
          <div className="mt-6">
            <label className="block text-white text-sm font-medium mb-2">
              Kommentarer (valgfritt)
            </label>
            <textarea
              className="w-full px-4 py-3 rounded-lg bg-white text-online-blue-900 placeholder-gray-400 focus:ring-2 focus:ring-online-orange focus:outline-none h-28 resize-none"
              placeholder="Legg til eventuelle kommentarer..."
              onChange={(e) =>
                setFormdata({ ...formdata, comments: e.target.value })
              }
            />
          </div>

          {/* Submit Button */}
          <div className="mt-8 text-center">
            <button
              disabled={disableSubmit}
              onClick={submitform}
              className="bg-online-orange text-online-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-online-orange-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {disableSubmit ? "Sender..." : "Send inn soknad"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationPage;
